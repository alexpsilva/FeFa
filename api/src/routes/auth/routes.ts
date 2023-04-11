import express, { NextFunction, Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import { LoginAuthBody } from "./types/login.dto"
import validate from "../../utils/validate"
import HttpError from "../../errors/http"
import { RefreshToken, User } from "@prisma/client"
import prisma from "../../prisma"
import verifyGoogleToken from "./utils/verify-google-token"
import { decodeRefreshToken, encodeAccessToken, encodeRefreshToken } from "./utils/jwt"
import authenticationMiddleware from "./middleware"
import { RefreshAuthBody } from "./types/refresh.dto"
import { REFRESH_TOKEN_EXPIRES_SECONDS } from "../../utils/env"
import dateDifference from "../../utils/date-difference"
import asyncRoute from "../../utils/async-route"

const router = express.Router()

router.post('/login', asyncRoute(
  async (req: Request, res: Response) => {
    const body = await validate(LoginAuthBody, req.body)

    const googleToken = await verifyGoogleToken(body.googleToken)
    if ('error' in googleToken) {
      throw new HttpError(StatusCodes.UNAUTHORIZED, googleToken.error)
    }

    const user = await prisma.user.findUnique({
      where: { email: googleToken.payload.email },
      include: { tokens: true }
    })
    if (!user) {
      throw new HttpError(StatusCodes.UNAUTHORIZED, "Unauthorized email")
    }

    const refreshToken = await prisma.refreshToken.create(
      { data: { userId: user.id } }
    )

    res.status(StatusCodes.CREATED)
    res.send({
      accessToken: encodeAccessToken(user.id),
      refreshToken: encodeRefreshToken(refreshToken.value)
    })
  }
))

router.post('/refresh', asyncRoute(
  async (req: Request, res: Response) => {
    const body = await validate(RefreshAuthBody, req.body)
    const decoded = decodeRefreshToken(body.refreshToken) as { value: string }
    const refreshToken = await prisma.refreshToken.findUnique(
      { where: { value: decoded.value } }
    )

    if (!refreshToken) {
      throw new HttpError(StatusCodes.UNAUTHORIZED, `Unauthorized refresh: ${refreshToken}`)
    }

    if (dateDifference(refreshToken.createdAt, new Date()) > REFRESH_TOKEN_EXPIRES_SECONDS) {
      throw new HttpError(StatusCodes.UNAUTHORIZED, "Expired refresh token")
    }

    res.status(StatusCodes.CREATED)
    res.send({ accessToken: encodeAccessToken(refreshToken.userId) })
  }
))

router.post('/logout',
  authenticationMiddleware,
  asyncRoute(async (req: Request, res: Response) => {
    await prisma.refreshToken.deleteMany({ where: { userId: res.locals.userId } })

    res.status(StatusCodes.NO_CONTENT)
    res.send()
  }
  ))

export default router