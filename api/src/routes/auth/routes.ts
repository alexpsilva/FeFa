import express, { NextFunction, Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import LoginAuthRequest from "./types/login.dto"
import validate from "../../utils/validate"
import HttpError from "../../errors/http"
import { AuthToken, User } from "@prisma/client"
import prisma from "../../prisma"
import deleteExpiredTokens from "./utils/delete-expired-tokens"
import verifyGoogleToken from "./utils/verify-google-token"
import { JwtEncode } from "./utils/jwt"
import authenticationMiddleware from "./middleware"

const router = express.Router()

router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  let body: LoginAuthRequest
  try { body = await validate(LoginAuthRequest, req.body) }
  catch (error) { return next(error) }

  const googleToken = await verifyGoogleToken(body.googleToken)
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
  res.send({ jwt: JwtEncode({ userId: user.id, token: authToken.value }) })
})

router.post('/logout',
  authenticationMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    await prisma.authToken.deleteMany({ where: { userId: res.locals.userId } })

    res.status(StatusCodes.NO_CONTENT)
    res.send()
  }
)

export default router