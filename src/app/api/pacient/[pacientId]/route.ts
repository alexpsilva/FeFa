import { Phone, WritablePacientSchema } from "@/types/model/pacient";
import authenticatedEndpoint from "@/utils/api/authenticatedEndpoint";
import { Prisma } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "../../prisma";


const Params = z.object({ params: z.object({ pacientId: z.coerce.number() }) })
type Params = z.infer<typeof Params>

const GET = authenticatedEndpoint(async (request: NextRequest, userId: number, params: Params) => {
  const { params: { pacientId } } = Params.parse(params)

  const pacient = await prisma.pacient.findUnique({
    where: { id: pacientId, userId },
    include: { phones: true },
  })

  if (!pacient) {
    return NextResponse.json(
      `Pacient #${pacientId} not found`,
      { status: StatusCodes.NOT_FOUND },
    )
  }

  return NextResponse.json(pacient)
})

const PATCH = authenticatedEndpoint(async (request: NextRequest, userId: number, params: Params) => {
  const { params: { pacientId } } = Params.parse(params)
  const body = WritablePacientSchema.parse(await request.json())

  const pacient = await prisma.pacient.findUnique({ where: { id: pacientId, userId } })
  if (!pacient) {
    return NextResponse.json(
      `Pacient #${pacientId} not found`,
      { status: StatusCodes.NOT_FOUND }
    )
  }

  const args: Prisma.PacientUpdateArgs = {
    where: { id: pacientId },
    data: {
      name: body.name,
      birthday: body.birthday && new Date(body.birthday),
      cpf: body.cpf,
      note: body.note,
      address: body.address,
    },
    include: { phones: true },
  }

  const phones = body.phones?.filter(phone => phone.number)
  if (phones) {
    const phonesToUpdate = phones.reduce(
      (acc, phone) => !!phone.id ? [...acc, phone as Phone] : acc,
      [] as Phone[],
    )
    const phonesToCreate = phones.reduce(
      (acc, phone) => !phone.id ? [...acc, { number: phone.number }] : acc,
      [] as Pick<Phone, 'number'>[],
    )

    args.data.phones = {
      deleteMany: { id: { notIn: phonesToUpdate.map(phone => phone.id!) } },
      updateMany: phonesToUpdate.map(phone => ({
        where: { id: phone.id },
        data: {
          id: phone.id,
          number: phone.number,
        }
      }
      )),
      createMany: { data: phonesToCreate },
    }
  }

  const newPacient = await prisma.pacient.update(args)
  revalidatePath('/(workspace)/pacient', 'page')
  revalidatePath(`/(workspace)/pacient/${pacientId}`, 'page')

  return NextResponse.json(newPacient)
})

const DELETE = authenticatedEndpoint(async (request: NextRequest, userId: number, params: Params) => {
  const { params: { pacientId } } = Params.parse(params)

  const pacient = await prisma.pacient.findUnique({
    where: { id: pacientId, userId },
    include: { phones: true },
  })

  if (!pacient) {
    return NextResponse.json(
      `Pacient #${pacientId} not found`,
      { status: StatusCodes.NOT_FOUND },
    )
  }

  await prisma.pacient.delete({ where: { id: pacient.id } })
  revalidatePath('/(workspace)/pacient', 'page')

  return new NextResponse()
})

export { GET, PATCH, DELETE }