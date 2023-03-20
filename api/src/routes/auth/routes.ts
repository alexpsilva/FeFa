import express, { NextFunction, Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import { logger } from "../../utils/logger"
import { OAuth2Client } from "google-auth-library"
import LoginAuthRequest from "./types/login.dto"
import validate from "../../utils/validate"
import HttpError from "../../errors/http"

const router = express.Router()

router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  let body: LoginAuthRequest
  try { body = await validate(LoginAuthRequest, req.body) }
  catch (error) { return next(error) }

  const clientId = process.env.GOOGLE_CLIENT_ID

  const client = new OAuth2Client(clientId)
  const ticket = await client.verifyIdToken({
    idToken: body.idToken,
    audience: clientId
  })

  const payload = ticket.getPayload()
  if (!payload) {
    return next(new HttpError(StatusCodes.UNAUTHORIZED, "Google SignIn validation failed"))
  }

  const email = payload.email
  logger.debug(payload)

  res.status(StatusCodes.OK)
  res.send()



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