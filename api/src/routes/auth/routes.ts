import { AuthToken, User } from "@prisma/client"
import validate from "../../utils/validate"
import express, { NextFunction, Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import prisma from "../../prisma"
import SignupAuthRequest from "./types/signup.dto"
import { logger } from "../../utils/logger"

const router = express.Router()

// router.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
//   let body: SignupAuthRequest
//   try { body = await validate(SignupAuthRequest, req.body) }
//   catch (error) { return next(error) }

//   let user: User
//   try { user = await prisma.user.create({ data: body }) }
//   catch (error) { return next(error) }

//   let token: AuthToken
//   try { token = await prisma.authToken.create({ data: { userId: user.id } }) }
//   catch (error) { return next(error) }

//   res.status(StatusCodes.CREATED)
//   res.send(token)
// })

router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  logger.debug(JSON.stringify(req))

  res.status(StatusCodes.OK)
  res.send()

  // let body: SignupAuthRequest
  // try { body = await validate(SignupAuthRequest, req.body) }
  // catch (error) { return next(error) }

  // let user: User
  // try { user = await prisma.user.create({ data: body }) }
  // catch (error) { return next(error) }

  // let token: AuthToken
  // try { token = await prisma.authToken.create({ data: { userId: user.id } }) }
  // catch (error) { return next(error) }

  // res.status(StatusCodes.CREATED)
  // res.send(token)
})

export default router