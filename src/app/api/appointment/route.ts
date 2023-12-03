import { WritableAppointmentSchema } from "@/types/model/appointment";
import authenticatedEndpoint from "@/utils/api/authenticatedEndpoint";
import { Prisma } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../prisma";


const GET = authenticatedEndpoint(async (request: NextRequest, userId: number) => {
  const { searchParams } = new URL(request.url)
  const pacientId = searchParams.get('pacientId')
  const includePacient = searchParams.get('includePacient') === 'true'
  const pageSize = searchParams.get('pageSize')
  const pageOffset = searchParams.get('pageOffset')

  const where: Prisma.AppointmentWhereInput = { pacient: { userId } }
  if (pacientId) where.pacient!.id = Number(pacientId)

  const findManyArgs: Prisma.AppointmentFindManyArgs = {
    where,
    include: { pacient: includePacient },
    orderBy: { updatedAt: 'asc' },
  }
  if (pageSize) findManyArgs.take = Number(pageSize)
  if (pageOffset) findManyArgs.skip = Number(pageOffset)

  const [appointments, count] = await Promise.all([
    prisma.appointment.findMany(findManyArgs),
    prisma.appointment.count({ where })
  ])

  return NextResponse.json(
    { data: appointments, total: count },
    { status: StatusCodes.OK },
  )
})


const POST = authenticatedEndpoint(async (request: NextRequest, userId: number) => {
  const body = WritableAppointmentSchema.parse(await request.json())

  const pacient = await prisma.pacient.findUnique({
    where: { id: body.pacientId, userId }
  })

  if (!pacient) {
    return NextResponse.json(
      `Pacient #${body.pacientId} not found`,
      { status: StatusCodes.NOT_FOUND },
    )
  }

  const args: Prisma.AppointmentCreateArgs = {
    data: {
      pacientId: body.pacientId,
      date: body.date,
      description: body.description
    }
  }

  const appointment = await prisma.appointment.create(args)

  return NextResponse.json(
    appointment,
    { status: StatusCodes.CREATED },
  )
})

export { GET, POST }