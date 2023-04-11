import { Prisma } from "@prisma/client"
import express, { Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import validate from "../../utils/validate"
import prisma from "../../prisma"
import asyncRoute from "../../utils/async-route"
import { GetUserParams } from "./types/get.dto"
import { DeleteUserParams } from "./types/delete.dto"
import { UpdateUserBody, UpdateUserParams } from "./types/update.dto"
import { CreateUserBody } from "./types/create.dto"

const router = express.Router()

router.post('/', asyncRoute(
  async (req: Request, res: Response) => {
    const body = await validate(CreateUserBody, req.body)

    const entry = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
      }
    })

    res.status(StatusCodes.CREATED)
    res.send(entry)
  }
))

router.patch('/:id', asyncRoute(
  async (req: Request, res: Response) => {
    const body = await validate(UpdateUserBody, req.body)
    const params = await validate(UpdateUserParams, req.params)

    const args: Prisma.UserUpdateArgs = {
      where: { id: Number(params.id) },
      data: {
        name: body.name,
        email: body.email,
      }
    }

    const entry = await prisma.user.update(args)

    res.status(StatusCodes.OK)
    res.send(entry)
  }
))

router.delete('/:id', asyncRoute(
  async (req: Request, res: Response) => {
    const params = await validate(DeleteUserParams, req.params)

    await prisma.user.delete({
      where: { id: Number(params.id) }
    })

    res.status(StatusCodes.NO_CONTENT)
    res.send()
  }
))

router.get('/', asyncRoute(
  async (req: Request, res: Response) => {
    const entry = await prisma.user.findMany()

    res.status(StatusCodes.OK)
    res.send(entry)
  }
))

router.get('/:id', asyncRoute(
  async (req: Request, res: Response) => {
    const params = await validate(GetUserParams, req.params)

    const entry = await prisma.user.findUnique({
      where: { id: Number(params.id) }
    })

    if (entry) { res.status(StatusCodes.OK) }
    else { res.status(StatusCodes.NOT_FOUND) }
    res.send(entry)
  }
))

export default router