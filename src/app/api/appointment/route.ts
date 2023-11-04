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

export { GET }