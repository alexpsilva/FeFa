import { deleteAppointment, getAppointment, updateAppointment } from "@/database/appointment";
import { WritableAppointmentSchema } from "@/types/model/appointment";
import protectedRoute from "@/utils/auth/protected-route";
import { StatusCodes } from "http-status-codes";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";


const Params = z.object({ params: z.object({ appointmentId: z.coerce.number() }) })
type Params = z.infer<typeof Params>

const GET = protectedRoute(async (request: NextRequest, userId: number, params: Params) => {
  const { params: { appointmentId } } = Params.parse(params)
  const appointment = getAppointment(userId, appointmentId)

  if (!appointment) {
    return NextResponse.json(
      `Pacient #${appointmentId} not found`,
      { status: StatusCodes.NOT_FOUND },
    )
  }

  return NextResponse.json(appointment)
})

const PATCH = protectedRoute(async (request: NextRequest, userId: number, params: Params) => {
  const { params: { appointmentId } } = Params.parse(params)
  const body = WritableAppointmentSchema.parse(await request.json())

  const { appointment, error } = await updateAppointment(userId, appointmentId, body)
  if (error) {
    return NextResponse.json(
      error,
      { status: StatusCodes.BAD_REQUEST }
    )
  }
  return NextResponse.json(appointment)
})

const DELETE = protectedRoute(async (request: NextRequest, userId: number, params: Params) => {
  const { params: { appointmentId } } = Params.parse(params)

  const { error } = await deleteAppointment(userId, appointmentId)
  if (error) {
    return NextResponse.json(
      error,
      { status: StatusCodes.BAD_REQUEST },
    )
  }

  return new NextResponse()
})

export { GET, PATCH, DELETE }