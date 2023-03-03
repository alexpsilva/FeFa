import { Prisma, Insurance } from "@prisma/client"
import express, { NextFunction, Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import validate from "../../utils/validate"
import prisma from "../../prisma"
import CreateInsuranceRequest from "./types/create.dto"
import UpdateInsuranceRequest from "./types/update.dto"
import BatchInsuranceRequest from "./types/batch.dto"
import { logger } from "../../utils/logger"
import HttpError from "../../errors/http"

const router = express.Router()

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  let entry: Insurance[] | null
  try { entry = await prisma.insurance.findMany() }
  catch (error) { return next(error) }

  logger.debug(entry)
  res.status(StatusCodes.OK)
  res.send(entry)
})

router.post('/batch', async (req: Request, res: Response, next: NextFunction) => {
  let body: BatchInsuranceRequest
  try { body = await validate(BatchInsuranceRequest, req.body) }
  catch (error) { return next(error) }

  const operations: Promise<any>[] = []
  const errors: any[] = []
  const addOperation = (operation: () => Promise<any>) => {
    operations.push(operation().catch(error => errors.push(error)))
  }

  if (body.delete?.length) {
    const args: Prisma.InsuranceDeleteManyArgs = {
      where: { id: { in: body.delete.map(i => Number(i)) } }
    }
    addOperation(() => prisma.insurance.deleteMany(args))
  }

  if (body.create?.length) {
    const args: Prisma.InsuranceCreateManyArgs = {
      data: body.create.map(i => ({ name: i.name }))
    }
    addOperation(() => prisma.insurance.createMany(args))
  }

  body.update?.map(i => {
    const args: Prisma.InsuranceUpdateArgs = {
      where: { id: Number(i.id) },
      data: { name: i.name }
    }
    addOperation(() => prisma.insurance.update(args))
  })

  await Promise.all(operations)

  if (errors.length) {
    next(new HttpError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      errors.map(e => String(e)).join('; ')
    ))
  }

  let result: Insurance[] | null
  try { result = await prisma.insurance.findMany() }
  catch (error) { return next(error) }

  res.status(StatusCodes.OK)
  res.send(result)
})

// router.post('/', async (req: Request, res: Response, next: NextFunction) => {
//   let body: CreateInsuranceRequest
//   try { body = await validate(CreateInsuranceRequest, req.body) }
//   catch (error) { return next(error) }

//   const args: Prisma.InsuranceCreateArgs = { data: { name: body.name } }

//   let entry: Insurance
//   try { entry = await prisma.insurance.create(args) }
//   catch (error) { return next(error) }

//   res.status(StatusCodes.CREATED)
//   res.send(entry)
// })

// router.patch('/:id', async (req: Request, res: Response, next: NextFunction) => {
//   let body: UpdateInsuranceRequest
//   try { body = await validate(UpdateInsuranceRequest, req.body) }
//   catch (error) { return next(error) }

//   const args: Prisma.InsuranceUpdateArgs = {
//     where: { id: Number(req.params.id) },
//     data: { name: body.name },
//   }

//   let entry: Insurance
//   try { entry = await prisma.insurance.update(args) }
//   catch (error) { return next(error) }

//   res.status(StatusCodes.OK)
//   res.send(entry)
// })

// router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
//   const args: Prisma.InsuranceDeleteArgs = {
//     where: {
//       id: Number(req.params.id)
//     }
//   }

//   try { await prisma.insurance.delete(args) }
//   catch (error) { return next(error) }

//   res.status(StatusCodes.NO_CONTENT)
//   res.send()
// })

// router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
//   const args: Prisma.InsuranceFindUniqueArgs = {
//     where: { id: Number(req.params.id) }
//   }

//   let entry: Insurance | null

//   try { entry = await prisma.insurance.findUnique(args) }
//   catch (error) { return next(error) }

//   if (entry) { res.status(StatusCodes.OK) }
//   else { res.status(StatusCodes.NOT_FOUND) }
//   res.send(entry)
// })

export default router