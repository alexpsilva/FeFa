import { Prisma, User } from "@prisma/client"
import express, { NextFunction, Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import validate from "../../utils/validate"
import prisma from "../../prisma"
import CreateUserRequest from "./types/create.dto"
import UpdateUserRequest from "./types/update.dto"

const router = express.Router()

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  let body: CreateUserRequest
  try { body = await validate(CreateUserRequest, req.body) }
  catch (error) { return next(error) }

  const args: Prisma.UserCreateArgs = {
    data: {
      name: body.name,
      email: body.email,
    }
  }

  let entry: User
  try { entry = await prisma.user.create(args) }
  catch (error) { return next(error) }

  res.status(StatusCodes.CREATED)
  res.send(entry)
})

router.patch('/:id', async (req: Request, res: Response, next: NextFunction) => {
  let body: UpdateUserRequest
  try { body = await validate(UpdateUserRequest, req.body) }
  catch (error) { return next(error) }

  const args: Prisma.UserUpdateArgs = {
    where: { id: Number(req.params.id) },
    data: {
      name: body.name,
      email: body.email,
    }
  }

  let entry: User
  try { entry = await prisma.user.update(args) }
  catch (error) { return next(error) }

  res.status(StatusCodes.OK)
  res.send(entry)
})

router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  const args: Prisma.UserDeleteArgs = {
    where: {
      id: Number(req.params.id)
    }
  }

  try { await prisma.user.delete(args) }
  catch (error) { return next(error) }

  res.status(StatusCodes.NO_CONTENT)
  res.send()
})

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  let entry: User[] | null
  try { entry = await prisma.user.findMany() }
  catch (error) { return next(error) }

  res.status(StatusCodes.OK)
  res.send(entry)
})

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  const args: Prisma.UserFindUniqueArgs = {
    where: { id: Number(req.params.id) }
  }

  let entry: User | null

  try { entry = await prisma.user.findUnique(args) }
  catch (error) { return next(error) }

  if (entry) { res.status(StatusCodes.OK) }
  else { res.status(StatusCodes.NOT_FOUND) }
  res.send(entry)
})

export default router