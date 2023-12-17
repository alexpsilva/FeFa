import 'server-only'

import { Prisma } from '@prisma/client'
import prisma from '@/app/api/prisma'
import { PAGINATION_PAGE_SIZE } from '@/constants'
import { Phone, WritablePacient } from '@/types/model/pacient'
import { revalidatePath } from 'next/cache'

const listPacients = async (
  userId: number, term?: string, pageSize?: number, pageOffset?: number
) => {
  const where: Prisma.PacientWhereInput = { userId }
  if (term) where.name = { contains: term }

  const [pacients, total] = await Promise.all([
    prisma.pacient.findMany({
      skip: Number(pageOffset) || 0,
      take: Number(pageSize) || PAGINATION_PAGE_SIZE,
      where,
      orderBy: { updatedAt: 'desc' }
    }),
    prisma.pacient.count({ where })
  ])

  return { pacients, total }
}

const getPacient = async (
  userId: number, pacientId: number
) => {
  return prisma.pacient.findUnique({
    where: { id: pacientId, userId },
    include: { phones: true },
  })
}

const createPacient = async (
  userId: number, pacient: WritablePacient
) => {
  const args: Prisma.PacientCreateArgs = {
    data: {
      userId,
      name: pacient.name,
      birthday: new Date(pacient.birthday),
      cpf: pacient.cpf,
      note: pacient.note,
      address: pacient.address,
    }
  }

  const phones = pacient.phones?.filter(phone => phone.number)
  if (phones) {
    const phonesToCreate = phones.reduce(
      (acc, phone) => !phone.id ? [...acc, { number: phone.number }] : acc,
      [] as Pick<Phone, 'number'>[],
    )
    args.data.phones = { createMany: { data: phonesToCreate } }
  }

  const result = await prisma.pacient.create(args)
  revalidatePath('/(workspace)/pacient', 'page')

  return result
}

const updatePacient = async (
  userId: number, pacientId: number, pacient: WritablePacient
) => {
  const existingPacient = await prisma.pacient.findUnique({ where: { id: pacientId, userId } })
  if (!existingPacient) { return { pacient: null, error: `Pacient #${pacientId} not found` } }

  const args: Prisma.PacientUpdateArgs = {
    where: { id: pacientId },
    data: {
      name: pacient.name,
      birthday: pacient.birthday && new Date(pacient.birthday),
      cpf: pacient.cpf,
      note: pacient.note,
      address: pacient.address,
    },
    include: { phones: true },
  }

  const phones = pacient.phones?.filter(phone => phone.number)
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

  return { pacient: newPacient, error: null }
}

const deletePacient = async (
  userId: number, pacientId: number
) => {
  const pacient = await prisma.pacient.findUnique({
    where: { id: pacientId, userId }
  })

  if (!pacient) { return { error: `Pacient #${pacientId} not found` } }

  await prisma.pacient.delete({ where: { id: pacient.id } })
  revalidatePath('/(workspace)/pacient', 'page')

  return { error: null }
}

export {
  listPacients,
  getPacient,
  createPacient,
  updatePacient,
  deletePacient,
}