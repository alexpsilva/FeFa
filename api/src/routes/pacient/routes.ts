import { Prisma, Pacient } from "@prisma/client"
import express, { NextFunction, Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import validate from "../../utils/validate"
import prisma from "../../prisma"
import CreatePacientRequest from "./types/create.dto"
import UpdatePacientRequest from "./types/update.dto"
import DeletePacientRequest from "./types/delete.dto"

const router = express.Router()

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  let body: CreatePacientRequest
  try { body = await validate(CreatePacientRequest, req.body) }
  catch (error) { return next(error) }

  const args: Prisma.PacientCreateArgs = {
    data: {
      userId: res.locals.userId,
      name: body.name,
      birthday: new Date(body.birthday),
      cpf: body.cpf,
      address: body.address,
    }
  }

  const phones = body.phones
  if (phones) { args.data.phones = { createMany: { data: phones } } }

  let entry: Pacient
  try { entry = await prisma.pacient.create(args) }
  catch (error) { return next(error) }

  res.status(StatusCodes.CREATED)
  res.send(entry)
})

router.patch('/:id', async (req: Request, res: Response, next: NextFunction) => {
  let body: UpdatePacientRequest
  try { body = await validate(UpdatePacientRequest, req.body) }
  catch (error) { return next(error) }

  // TO-DO: Validate userID
  const args: Prisma.PacientUpdateArgs = {
    where: { id: Number(req.params.id) },
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

  let entry: Pacient
  try { entry = await prisma.pacient.update(args) }
  catch (error) { return next(error) }

  res.status(StatusCodes.OK)
  res.send(entry)
})

router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  let body: DeletePacientRequest
  try { body = await validate(DeletePacientRequest, req.body) }
  catch (error) { return next(error) }

  let pacient: Pacient | null
  try { pacient = await prisma.pacient.findUnique({ where: { id: body.id } }) }
  catch (error) { return next(error) }

  const userId = res.locals.userId as number
  if (!pacient || pacient.userId != userId) {
    res.status(StatusCodes.NOT_FOUND)
    res.send()
    return
  }

  try { await prisma.pacient.deleteMany({ where: { id: pacient.id } }) }
  catch (error) { return next(error) }

  res.status(StatusCodes.NO_CONTENT)
  res.send()
})

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const userId = res.locals.userId as number

  let pacients: Pacient[] | null
  try { pacients = await prisma.pacient.findMany({ where: { userId }, include: { phones: true } }) }
  catch (error) { return next(error) }

  res.status(StatusCodes.OK)
  res.send(pacients)
})

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  const userId = res.locals.userId as number
  const args: Prisma.PacientFindUniqueArgs = {
    where: { id: Number(req.params.id) },
    include: { phones: true },
  }

  let entry: Pacient | null

  try { entry = await prisma.pacient.findUnique(args) }
  catch (error) { return next(error) }

  if (!entry || entry.userId != userId) {
    res.status(StatusCodes.NOT_FOUND)
    res.send()
  }
  else {
    res.status(StatusCodes.OK)
    res.send(entry)
  }
})

export default router