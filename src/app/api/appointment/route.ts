import { PAGINATION_PAGE_SIZE } from "@/constants";
import { WritableAppointmentSchema } from "@/types/model/appointment";
import authenticatedEndpoint from "@/utils/api/authenticatedEndpoint";
import { Prisma } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../prisma";


const GET = authenticatedEndpoint(async (request: NextRequest, userId: number) => {
  const { searchParams } = new URL(request.url)
  const pacientId = searchParams.get('pacientId')
  const pageSize = searchParams.get('pageSize')
  const pageOffset = searchParams.get('pageOffset')

  const where: Prisma.AppointmentWhereInput = { pacient: { userId } }
  if (pacientId) where.pacient!.id = Number(pacientId)

  const [appointments, count] = await Promise.all([
    prisma.appointment.findMany({
      skip: Number(pageOffset) || 0,
      take: Number(pageSize) || PAGINATION_PAGE_SIZE,
      where,
      orderBy: { date: 'desc' },
    }),
    prisma.appointment.count({ where })
  ])

  return NextResponse.json(
    { data: appointments, total: count },
    { status: StatusCodes.OK },
  )
})


const POST = authenticatedEndpoint(async (request: NextRequest, userId: number) => {
  const {
    pacientId,
    date,
    description,
  } = WritableAppointmentSchema.parse(await request.json())

  const pacient = await prisma.pacient.findUnique({
    where: { id: pacientId, userId }
  })

  if (!pacient) {
    return NextResponse.json(
      `Pacient #${pacientId} not found`,
      { status: StatusCodes.NOT_FOUND },
    )
  }

  const args: Prisma.AppointmentCreateArgs = {
    data: {
      pacientId,
      date,
      description,
    }
  }

  const appointment = await prisma.appointment.create(args)
  revalidatePath(`/(workspace)/pacient/${pacientId}`, 'page')

  return NextResponse.json(
    appointment,
    { status: StatusCodes.CREATED },
  )
})

export { GET, POST }