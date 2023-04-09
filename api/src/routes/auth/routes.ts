import express, { NextFunction, Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import LoginAuthRequest from "./types/login.dto"
import validate from "../../utils/validate"
import HttpError from "../../errors/http"
import { RefreshToken, User } from "@prisma/client"
import prisma from "../../prisma"
import verifyGoogleToken from "./utils/verify-google-token"
import { decodeRefreshToken, encodeAccessToken, encodeRefreshToken } from "./utils/jwt"
import authenticationMiddleware from "./middleware"
import RefreshAuthRequest from "./types/refresh.dto"
import { REFRESH_TOKEN_EXPIRES_SECONDS } from "../../utils/env"
import dateDifference from "../../utils/date-difference"

const router = express.Router()

router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  let body: LoginAuthRequest
  try { body = await validate(LoginAuthRequest, req.body) }
  catch (error) { return next(error) }

  const googleToken = await verifyGoogleToken(body.googleToken)
  if ('error' in googleToken) {
    return next(new HttpError(StatusCodes.UNAUTHORIZED, googleToken.error))
  }

  let user: User & { tokens: RefreshToken[] } | null
  try {
    user = await prisma.user.findUnique({
      where: { email: googleToken.payload.email },
      include: { tokens: true }
    })
  }
  catch (error) { return next(error) }
  if (!user) { return next(new HttpError(StatusCodes.UNAUTHORIZED, "Unauthorized email")) }

  let refreshToken: RefreshToken
  try { refreshToken = await prisma.refreshToken.create({ data: { userId: user.id } }) }
  catch (error) { return next(error) }

  res.status(StatusCodes.CREATED)
  res.send({
    accessToken: encodeAccessToken(user.id),
    refreshToken: encodeRefreshToken(refreshToken.value)
  })
})

router.post('/refresh', async (req: Request, res: Response, next: NextFunction) => {
  let body: RefreshAuthRequest
  try { body = await validate(RefreshAuthRequest, req.body) }
  catch (error) { return next(error) }

  let decoded: { value: string }
  try { decoded = decodeRefreshToken(body.refreshToken) as { value: string } }
  catch (error) { return next(error) }

  let refreshToken: RefreshToken | null
  try { refreshToken = await prisma.refreshToken.findUnique({ where: { value: decoded.value } }) }
  catch (error) { return next(error) }

  if (!refreshToken) {
    return next(new HttpError(StatusCodes.UNAUTHORIZED, `Unauthorized refresh: ${refreshToken}`))
  }

  if (dateDifference(refreshToken.createdAt, new Date()) > REFRESH_TOKEN_EXPIRES_SECONDS) {
    return next(new HttpError(StatusCodes.UNAUTHORIZED, "Expired refresh token"))
  }

  res.status(StatusCodes.CREATED)
  res.send({ accessToken: encodeAccessToken(refreshToken.userId) })
})

router.post('/logout',
  authenticationMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    await prisma.refreshToken.deleteMany({ where: { userId: res.locals.userId } })

    res.status(StatusCodes.NO_CONTENT)
    res.send()
  }
)

export default router