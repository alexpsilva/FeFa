import { Prisma } from "@prisma/client"
import express, { Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import validate from "../../utils/validate"
import prisma from "../../prisma"
import { BatchInsuranceBody } from "./types/batch.dto"
import HttpError from "../../errors/http"
import asyncRoute from "../../utils/async-route"

const router = express.Router()

router.get('/', asyncRoute(
  async (req: Request, res: Response) => {
    const userId = res.locals.userId as number

    const entry = await prisma.insurance.findMany(
      { where: { userId } }
    )

    res.status(StatusCodes.OK)
    res.send(entry)
  }
))

router.post('/batch', asyncRoute(
  async (req: Request, res: Response) => {
    const body = await validate(BatchInsuranceBody, req.body)

    const operations: Promise<any>[] = []
    const errors: any[] = []
    const addOperation = (operation: () => Promise<any>) => {
      operations.push(operation().catch(error => errors.push(error)))
    }

    const userId = res.locals.userId as number
    if (body.delete?.length) {
      const args: Prisma.InsuranceDeleteManyArgs = {
        where: { id: { in: body.delete.map(i => Number(i)) }, userId }
      }
      addOperation(() => prisma.insurance.deleteMany(args))
    }

    if (body.create?.length) {
      const args: Prisma.InsuranceCreateManyArgs = {
        data: body.create.map(i => ({ name: i.name, userId }))
      }
      addOperation(() => prisma.insurance.createMany(args))
    }

    body.update?.map(i => {
      const args: Prisma.InsuranceUpdateManyArgs = {
        where: { id: Number(i.id), userId },
        data: { name: i.name }
      }
      addOperation(() => prisma.insurance.updateMany(args))
    })

    await Promise.all(operations)

    if (errors.length) {
      throw new HttpError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        errors.map(e => String(e)).join('; ')
      )
    }

    const result = await prisma.insurance.findMany()

    res.status(StatusCodes.OK)
    res.send(result)
  }
))

// router.post('/', async (req: Request, res: Response) => {
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

// router.patch('/:id', async (req: Request, res: Response) => {
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

// router.delete('/:id', async (req: Request, res: Response) => {
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

// router.get('/:id', async (req: Request, res: Response) => {
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