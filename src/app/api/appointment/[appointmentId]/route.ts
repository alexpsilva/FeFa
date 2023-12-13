import { WritableAppointmentSchema } from "@/types/model/appointment";
import authenticatedEndpoint from "@/utils/api/authenticatedEndpoint";
import { Prisma } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "../../prisma";


const Params = z.object({ params: z.object({ appointmentId: z.coerce.number() }) })
type Params = z.infer<typeof Params>

const GET = authenticatedEndpoint(async (request: NextRequest, userId: number, params: Params) => {
  const { params: { appointmentId } } = Params.parse(params)

  const appointment = await prisma.appointment.findUnique({
    where: { id: appointmentId, pacient: { userId } },
  })

  if (!appointment) {
    return NextResponse.json(
      `Pacient #${appointmentId} not found`,
      { status: StatusCodes.NOT_FOUND },
    )
  }

  return NextResponse.json(appointment)
})

const PATCH = authenticatedEndpoint(async (request: NextRequest, userId: number, params: Params) => {
  const { params: { appointmentId } } = Params.parse(params)
  const {
    date,
    description,
  } = WritableAppointmentSchema.omit({ pacientId: true }).parse(await request.json())

  const appointment = await prisma.appointment.findUnique({
    where: { id: appointmentId, pacient: { userId } }
  })
  if (!appointment) {
    return NextResponse.json(
      `Appointment #${appointmentId} not found`,
      { status: StatusCodes.NOT_FOUND }
    )
  }

  const args: Prisma.AppointmentUpdateArgs = {
    where: { id: appointmentId },
    data: {
      date,
      description,
    }
  }

  const newAppointment = await prisma.appointment.update(args)
  revalidatePath(`/(workspace)/pacient/${appointment.pacientId}`, 'page')
  revalidatePath(`/(workspace)/pacient/${appointment.pacientId}/appointment/${appointment.id}`, 'page')

  return NextResponse.json(newAppointment)
})

const DELETE = authenticatedEndpoint(async (request: NextRequest, userId: number, params: Params) => {
  const { params: { appointmentId } } = Params.parse(params)

  const appointment = await prisma.appointment.findUnique({
    where: { id: appointmentId, pacient: { userId } },
  })

  if (!appointment) {
    return NextResponse.json(
      `Appointment #${appointmentId} not found`,
      { status: StatusCodes.NOT_FOUND },
    )
  }

  await prisma.appointment.delete({ where: { id: appointment.id } })
  revalidatePath(`/(workspace)/pacient/${appointment.pacientId}`, 'page')

  return new NextResponse()
})

export { GET, PATCH, DELETE }