import { Prisma, Insurance } from "@prisma/client"
import express, { NextFunction, Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import validate from "../../utils/validate"
import prisma from "../../prisma"
import CreateInsuranceRequest from "./types/create.dto"
import UpdateInsuranceRequest from "./types/update.dto"

const router = express.Router()

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  let body: CreateInsuranceRequest
  try { body = await validate(CreateInsuranceRequest, req.body) }
  catch (error) { return next(error) }

  const args: Prisma.InsuranceCreateArgs = { data: { name: body.name } }

  let entry: Insurance
  try { entry = await prisma.insurance.create(args) }
  catch (error) { return next(error) }

  res.status(StatusCodes.CREATED)
  res.send(entry)
})

router.patch('/:id', async (req: Request, res: Response, next: NextFunction) => {
  let body: UpdateInsuranceRequest
  try { body = await validate(UpdateInsuranceRequest, req.body) }
  catch (error) { return next(error) }

  const args: Prisma.InsuranceUpdateArgs = {
    where: { id: Number(req.params.id) },
    data: { name: body.name },
  }

  let entry: Insurance
  try { entry = await prisma.insurance.update(args) }
  catch (error) { return next(error) }

  res.status(StatusCodes.OK)
  res.send(entry)
})

router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  const args: Prisma.InsuranceDeleteArgs = {
    where: {
      id: Number(req.params.id)
    }
  }

  try { await prisma.insurance.delete(args) }
  catch (error) { return next(error) }

  res.status(StatusCodes.NO_CONTENT)
  res.send()
})

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  let entry: Insurance[] | null
  try { entry = await prisma.insurance.findMany() }
  catch (error) { return next(error) }

  res.status(StatusCodes.OK)
  res.send(entry)
})

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  const args: Prisma.InsuranceFindUniqueArgs = {
    where: { id: Number(req.params.id) }
  }

  let entry: Insurance | null

  try { entry = await prisma.insurance.findUnique(args) }
  catch (error) { return next(error) }

  if (entry) { res.status(StatusCodes.OK) }
  else { res.status(StatusCodes.NOT_FOUND) }
  res.send(entry)
})

export default router