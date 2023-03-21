import express, { NextFunction, Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import { logger } from "../../utils/logger"
import { OAuth2Client } from "google-auth-library"
import LoginAuthRequest from "./types/login.dto"
import validate from "../../utils/validate"
import HttpError from "../../errors/http"
import { AuthToken, Prisma, User } from "@prisma/client"
import prisma from "../../prisma"
import deleteExpiredTokens from "./utils/delete-expired-tokens"
import verifyGoogleToken from "./utils/verify-google-token"

const router = express.Router()

router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  let body: LoginAuthRequest
  try { body = await validate(LoginAuthRequest, req.body) }
  catch (error) { return next(error) }

  const googleToken = await verifyGoogleToken(body.idToken)
  if ('error' in googleToken) {
    return next(new HttpError(StatusCodes.UNAUTHORIZED, googleToken.error))
  }

  let user: User & { tokens: AuthToken[] } | null
  try {
    user = await prisma.user.findUnique({
      where: { email: googleToken.payload.email },
      include: { tokens: true }
    })
  }
  catch (error) { return next(error) }
  if (!user) { return next(new HttpError(StatusCodes.UNAUTHORIZED, "Unauthorized email")) }

  const cleanup = deleteExpiredTokens(user.tokens)

  let authToken: AuthToken
  try { authToken = await prisma.authToken.create({ data: { userId: user.id } }) }
  catch (error) { return next(error) }

  await cleanup
  res.status(StatusCodes.CREATED)
  res.send(authToken) // TO-DO: Wrap the created token in a JWT to allow validating its origin
})

export default router