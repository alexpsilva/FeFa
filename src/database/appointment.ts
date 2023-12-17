import 'server-only'

import { Prisma } from '@prisma/client'
import prisma from '@/app/api/prisma'
import { PAGINATION_PAGE_SIZE } from '@/constants'
import { WritableAppointment, WritableAppointmentWithPacientId } from '@/types/model/appointment'
import { revalidatePath } from 'next/cache'
import { getPacient } from './pacient'

const listAppointments = async (
  userId: number, pacientId?: number, pageSize?: number, pageOffset?: number
) => {
  const where: Prisma.AppointmentWhereInput = { pacient: { userId } }
  if (pacientId) where.pacient!.id = Number(pacientId)

  const [appointments, total] = await Promise.all([
    prisma.appointment.findMany({
      skip: Number(pageOffset) || 0,
      take: Number(pageSize) || PAGINATION_PAGE_SIZE,
      where,
      orderBy: { date: 'desc' },
    }),
    prisma.appointment.count({ where })
  ])

  return { appointments, total }
}

const getAppointment = async (
  userId: number, appointmentId: number
) => {
  return prisma.appointment.findUnique({
    where: { id: appointmentId, pacient: { userId } },
  })
}

const createAppointment = async (
  userId: number, appointment: WritableAppointmentWithPacientId
) => {
  const pacientId = appointment.pacientId
  const pacient = await getPacient(userId, pacientId)
  if (!pacient) {
    return {
      appointment: null,
      error: `Pacient #${pacientId} not found`
    }
  }

  const newAppointment = await prisma.appointment.create({ data: appointment })
  revalidatePath(`/(workspace)/pacient/${pacientId}`, 'page')

  return { appointment: newAppointment, error: null }
}

const updateAppointment = async (
  userId: number, appointmentId: number, appointment: WritableAppointment
) => {
  const existingAppointment = await prisma.appointment.findUnique({
    where: { id: appointmentId, pacient: { userId } }
  })
  if (!existingAppointment) {
    return { appointment: null, error: `Appointment #${appointmentId} not found` }
  }

  const args: Prisma.AppointmentUpdateArgs = {
    where: { id: appointmentId },
    data: appointment
  }

  const newAppointment = await prisma.appointment.update(args)
  revalidatePath(`/(workspace)/pacient/${newAppointment.pacientId}`, 'page')
  revalidatePath(`/(workspace)/pacient/${newAppointment.pacientId}/appointment/${appointmentId}`, 'page')

  return { appointment: newAppointment, error: null }
}

const deleteAppointment = async (
  userId: number, appointmentId: number
) => {
  const appointment = await prisma.appointment.findUnique({
    where: { id: appointmentId, pacient: { userId } },
  })

  if (!appointment) {
    return { error: `Appointment #${appointmentId} not found` }
  }

  await prisma.appointment.delete({ where: { id: appointment.id } })
  revalidatePath(`/(workspace)/pacient/${appointment.pacientId}`, 'page')

  return { error: null }
}

export {
  listAppointments,
  getAppointment,
  createAppointment,
  updateAppointment,
  deleteAppointment,
}