import { Prisma, Appointment } from "@prisma/client"
import express, { NextFunction, Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import validate from "../../utils/validate"
import prisma from "../../prisma"
import CreateAppointmentRequest from "./types/create.dto"
import UpdateAppointmentRequest from "./types/update.dto"

const router = express.Router()

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  let body: CreateAppointmentRequest
  try { body = await validate(CreateAppointmentRequest, req.body) }
  catch (error) { return next(error) }

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

  const args: Prisma.AppointmentUpdateArgs = {
    where: { id: Number(req.params.id) },
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
  const args: Prisma.AppointmentDeleteArgs = {
    where: {
      id: Number(req.params.id)
    }
  }

  try { await prisma.appointment.delete(args) }
  catch (error) { return next(error) }

  res.status(StatusCodes.NO_CONTENT)
  res.send()
})

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  let entry: Appointment[] | null
  try { entry = await prisma.appointment.findMany() }
  catch (error) { return next(error) }

  res.status(StatusCodes.OK)
  res.send(entry)
})

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  const args: Prisma.AppointmentFindUniqueArgs = {
    where: { id: Number(req.params.id) },
  }

  let entry: Appointment | null

  try { entry = await prisma.appointment.findUnique(args) }
  catch (error) { return next(error) }

  if (entry) { res.status(StatusCodes.OK) }
  else { res.status(StatusCodes.NOT_FOUND) }
  res.send(entry)
})

export default router