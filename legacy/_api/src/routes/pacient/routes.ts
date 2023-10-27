import { Prisma } from "@prisma/client"
import express, { Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import validate from "../../utils/validate"
import prisma from "../../prisma"
import asyncRoute from "../../utils/async-route"
import { GetPacientParams } from "./types/get.dto"
import { DeletePacientParams } from "./types/delete.dto"
import { UpdatePacientBody, UpdatePacientParams } from "./types/update.dto"
import { CreatePacientBody } from "./types/create.dto"
import { ListPacientQuery } from "./types/list.dto"
import { PAGINATION_PAGE_SIZE_LIMIT } from "../../utils/env"
import { logger } from "../../utils/logger"

const router = express.Router()

router.post('/', asyncRoute(
  async (req: Request, res: Response) => {
    const body = await validate(CreatePacientBody, req.body)

    const userId = res.locals.userId as number
    const args: Prisma.PacientCreateArgs = {
      data: {
        userId,
        name: body.name,
        birthday: new Date(body.birthday),
        cpf: body.cpf,
        address: body.address,
      }
    }

    const phones = body.phones
    if (phones) { args.data.phones = { createMany: { data: phones } } }

    const entry = await prisma.pacient.create(args)

    res.status(StatusCodes.CREATED)
    res.send(entry)
  }
))

router.patch('/:id', asyncRoute(
  async (req: Request, res: Response) => {
    const body = await validate(UpdatePacientBody, req.body)
    const params = await validate(UpdatePacientParams, req.params)

    const pacient = await prisma.pacient.findUnique(
      { where: { id: Number(params.id) } }
    )

    const userId = res.locals.userId as number
    if (!pacient || pacient.userId != userId) {
      res.status(StatusCodes.NOT_FOUND)
      res.send()
      return
    }

    const args: Prisma.PacientUpdateArgs = {
      where: { id: pacient.id },
      data: {
        name: body.name,
        birthday: body.birthday && new Date(body.birthday),
        cpf: body.cpf,
        address: body.address,
      },
      include: { phones: true },
    }

    const phones = body.phones
    if (phones) {
      const phonesToUpdate = phones.filter(phone => phone.id)
      const phonesToCreate = phones.filter(phone => !phone.id)

      args.data.phones = {
        deleteMany: { id: { notIn: phonesToUpdate.map(phone => phone.id!) } },
        updateMany: phonesToUpdate.map(phone => ({
          where: { id: phone.id },
          data: {
            id: phone.id,
            label: phone.label,
            number: phone.number,
          }
        }
        )),
        createMany: { data: phonesToCreate },
      }
    }

    const entry = await prisma.pacient.update(args)

    res.status(StatusCodes.OK)
    res.send(entry)
  }
))

router.delete('/:id', asyncRoute(
  async (req: Request, res: Response) => {
    const params = await validate(DeletePacientParams, req.params)

    const pacient = await prisma.pacient.findUnique(
      { where: { id: Number(params.id) } }
    )

    const userId = res.locals.userId as number
    if (!pacient || pacient.userId != userId) {
      res.status(StatusCodes.NOT_FOUND)
      res.send()
      return
    }

    await prisma.pacient.delete({ where: { id: pacient.id } })

    res.status(StatusCodes.NO_CONTENT)
    res.send()
  }
))

router.get('/', asyncRoute(
  async (req: Request, res: Response) => {
    const query = await validate(ListPacientQuery, req.query)
    const userId = res.locals.userId as number

    const where: Prisma.PacientWhereInput = { userId }
    if (query.name) where.name = { contains: query.name, mode: 'insensitive' }

    const [pacients, count] = await Promise.all([
      prisma.pacient.findMany({
        skip: Number(query.pageOffset) || 0,
        take: Number(query.pageSize) || PAGINATION_PAGE_SIZE_LIMIT,
        where,
      }),
      prisma.pacient.count({ where })
    ])

    res.status(StatusCodes.OK)
    res.send({ data: pacients, total: count })
  }
))

router.get('/:id', asyncRoute(
  async (req: Request, res: Response) => {
    const params = await validate(GetPacientParams, req.params)

    const userId = res.locals.userId as number
    const entry = await prisma.pacient.findUnique({
      where: { id: Number(params.id) },
      include: { phones: true },
    })

    if (!entry || entry.userId != userId) {
      res.status(StatusCodes.NOT_FOUND)
      res.send()
    }
    else {
      res.status(StatusCodes.OK)
      res.send(entry)
    }
  }
))

export default router