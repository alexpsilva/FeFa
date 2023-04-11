import { Prisma } from "@prisma/client"
import express, { Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import validate from "../../utils/validate"
import prisma from "../../prisma"
import asyncRoute from "../../utils/async-route"
import { GetAppointmentParams } from "./types/get.dto"
import { ListAppointmentQuery } from "./types/list.dto"
import { DeleteAppointmentRequest } from "./types/delete.dto"
import { UpdateAppointmentBody, UpdateAppointmentParams } from "./types/update.dto"
import { CreateAppointmentBody } from "./types/create.dto"

const router = express.Router()

router.post('/', asyncRoute(
  async (req: Request, res: Response) => {
    const body = await validate(CreateAppointmentBody, req.body)

    const pacient = await prisma.pacient.findUnique(
      { where: { id: body.pacientId } }
    )

    const userId = res.locals.userId as number
    if (!pacient || pacient.userId != userId) {
      res.status(StatusCodes.NOT_FOUND)
      res.send()
      return
    }

    const entry = await prisma.appointment.create({
      data: {
        pacientId: body.pacientId,
        date: new Date(body.date),
        description: body.description,
      }
    })

    res.status(StatusCodes.CREATED)
    res.send(entry)
  }
))

router.patch('/:id', asyncRoute(
  async (req: Request, res: Response) => {
    const body = await validate(UpdateAppointmentBody, req.body)
    const params = await validate(UpdateAppointmentParams, req.params)

    const appointment = await prisma.appointment.findUnique({
      where: { id: Number(params.id) },
      include: { pacient: true },
    })

    const userId = res.locals.userId as number
    if (!appointment || appointment.pacient.userId != userId) {
      res.status(StatusCodes.NOT_FOUND)
      res.send()
      return
    }

    const entry = await prisma.appointment.update({
      where: { id: appointment.id },
      data: {
        pacientId: body.pacientId,
        date: new Date(body.date),
        description: body.description,
      },
    })

    res.status(StatusCodes.OK)
    res.send(entry)
  }
))

router.delete('/:id', asyncRoute(
  async (req: Request, res: Response) => {
    const params = await validate(DeleteAppointmentRequest, req.params)

    const appointment = await prisma.appointment.findUnique({
      where: { id: params.id },
      include: { pacient: true },
    })

    const userId = res.locals.userId as number
    if (!appointment || appointment.pacient.userId != userId) {
      res.status(StatusCodes.NOT_FOUND)
      res.send()
      return
    }

    await prisma.appointment.delete(
      { where: { id: appointment.id } }
    )

    res.status(StatusCodes.NO_CONTENT)
    res.send()
  }
))

router.get('/', asyncRoute(
  async (req: Request, res: Response) => {
    const query = await validate(ListAppointmentQuery, req.query)

    const userId = res.locals.userId as number
    const args: Prisma.AppointmentFindManyArgs = { where: { pacient: { userId } } }
    if (query.includePacient == 'true') args.include = { pacient: true }
    if (query.pacientId) args.where!.pacient!.id = Number(query.pacientId)

    const entry = await prisma.appointment.findMany(args)

    res.status(StatusCodes.OK)
    res.send(entry)
  }
))

router.get('/:id', asyncRoute(
  async (req: Request, res: Response) => {
    const params = await validate(GetAppointmentParams, req.params)

    const userId = res.locals.userId as number
    const entry = await prisma.appointment.findUnique({
      where: { id: Number(params.id) },
      include: { pacient: true },
    })

    if (!entry || entry.pacient.userId != userId) {
      res.status(StatusCodes.NOT_FOUND)
      res.send()
    } else {
      res.status(StatusCodes.OK)
      res.send(entry)
    }
  }
))

export default router