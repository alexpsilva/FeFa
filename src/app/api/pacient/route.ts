import { PAGINATION_PAGE_SIZE } from "@/constants";
import { Phone, WritablePacientSchema } from "@/types/model/pacient";
import authenticatedEndpoint from "@/utils/api/authenticatedEndpoint";
import { Prisma } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../prisma";


const GET = authenticatedEndpoint(async (request: NextRequest, userId: number) => {
  const { searchParams } = new URL(request.url)
  const term = searchParams.get('term')
  const pageSize = searchParams.get('pageSize')
  const pageOffset = searchParams.get('pageOffset')

  const where: Prisma.PacientWhereInput = { userId }
  if (term) where.name = { contains: term }

  const [pacients, count] = await Promise.all([
    prisma.pacient.findMany({
      skip: Number(pageOffset) || 0,
      take: Number(pageSize) || PAGINATION_PAGE_SIZE,
      where,
      orderBy: { updatedAt: 'desc' }
    }),
    prisma.pacient.count({ where })
  ])

  return NextResponse.json(
    { data: pacients, total: count },
    { status: StatusCodes.OK },
  )
})


const POST = authenticatedEndpoint(async (request: NextRequest, userId: number) => {
  const body = WritablePacientSchema.parse(await request.json())

  const args: Prisma.PacientCreateArgs = {
    data: {
      userId,
      name: body.name,
      birthday: new Date(body.birthday),
      cpf: body.cpf,
      note: body.note,
      address: body.address,
    }
  }

  const phones = body.phones?.filter(phone => phone.number)
  if (phones) {
    const phonesToCreate = phones.reduce(
      (acc, phone) => !phone.id ? [...acc, { number: phone.number }] : acc,
      [] as Pick<Phone, 'number'>[],
    )
    args.data.phones = { createMany: { data: phonesToCreate } }
  }

  const pacient = await prisma.pacient.create(args)
  revalidatePath('/(workspace)/pacient', 'page')

  return NextResponse.json(
    pacient,
    { status: StatusCodes.CREATED },
  )
})

export { GET, POST }