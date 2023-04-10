import { Prisma, Appointment, Pacient } from "@prisma/client"
import express, { NextFunction, Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import validate from "../../utils/validate"
import prisma from "../../prisma"
import CreateAppointmentRequest from "./types/create.dto"
import UpdateAppointmentRequest from "./types/update.dto"
import ListAppointmentRequest from "./types/list.dto"
import DeleteAppointmentRequest from "./types/delete.dto"

const router = express.Router()

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  let body: CreateAppointmentRequest
  try { body = await validate(CreateAppointmentRequest, req.body) }
  catch (error) { return next(error) }

  let pacient: Pacient | null
  try { pacient = await prisma.pacient.findUnique({ where: { id: body.pacientId } }) }
  catch (error) { return next(error) }

  const userId = res.locals.userId as number
  if (!pacient || pacient.userId != userId) {
    res.status(StatusCodes.NOT_FOUND)
    res.send()
    return
  }

  const args: Prisma.AppointmentCreateArgs = {
    data: {
      pacientId: body.pacientId,
      date: new Date(body.date),
      description: body.description,
    }
  }

  let entry: Appointment
  try { entry = await prisma.appointment.create(args) }
  catch (error) { return next(error) }

  res.status(StatusCodes.CREATED)
  res.send(entry)
})

router.patch('/:id', async (req: Request, res: Response, next: NextFunction) => {
  let body: UpdateAppointmentRequest
  try { body = await validate(UpdateAppointmentRequest, req.body) }
  catch (error) { return next(error) }

  const appointmentId = Number(req.params.id)

  let appointment: Appointment & { pacient: Pacient } | null
  try { appointment = await prisma.appointment.findUnique({ where: { id: appointmentId }, include: { pacient: true } }) }
  catch (error) { return next(error) }

  const userId = res.locals.userId as number
  if (!appointment || appointment.pacient.userId != userId) {
    res.status(StatusCodes.NOT_FOUND)
    res.send()
    return
  }

  const args: Prisma.AppointmentUpdateArgs = {
    where: { id: appointmentId },
    data: {
      pacientId: body.pacientId,
      date: new Date(body.date),
      description: body.description,
    },
  }

  let entry: Appointment
  try { entry = await prisma.appointment.update(args) }
  catch (error) { return next(error) }

  res.status(StatusCodes.OK)
  res.send(entry)
})

router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  let params: DeleteAppointmentRequest
  try { params = await validate(DeleteAppointmentRequest, req.params) }
  catch (error) { return next(error) }

  let appointment: Appointment & { pacient: Pacient } | null
  try { appointment = await prisma.appointment.findUnique({ where: { id: params.id }, include: { pacient: true } }) }
  catch (error) { return next(error) }

  const userId = res.locals.userId as number
  if (!appointment || appointment.pacient.userId != userId) {
    res.status(StatusCodes.NOT_FOUND)
    res.send()
    return
  }

  try { await prisma.appointment.delete({ where: { id: appointment.id } }) }
  catch (error) { return next(error) }

  res.status(StatusCodes.NO_CONTENT)
  res.send()
})

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  let query: ListAppointmentRequest
  try { query = await validate(ListAppointmentRequest, req.query) }
  catch (error) { return next(error) }

  const userId = res.locals.userId as number
  const args: Prisma.AppointmentFindManyArgs = { where: { pacient: { userId } } }
  if (query.includePacient == 'true') args.include = { pacient: true }
  if (query.pacientId) args.where!.pacient!.id = Number(query.pacientId)

  let entry: Appointment[] | null
  try { entry = await prisma.appointment.findMany(args) }
  catch (error) { return next(error) }

  res.status(StatusCodes.OK)
  res.send(entry)
})

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  const userId = res.locals.userId as number
  const args = {
    where: { id: Number(req.params.id) },
    include: { pacient: true },
  }

  let entry: Appointment & { pacient: Pacient } | null
  try { entry = await prisma.appointment.findUnique(args) }
  catch (error) { return next(error) }

  if (!entry || entry.pacient.userId != userId) {
    res.status(StatusCodes.NOT_FOUND)
    res.send()
  } else {
    res.status(StatusCodes.OK)
    res.send(entry)
  }
})

export default router