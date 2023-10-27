import { NextFunction, Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import HttpError from "../../errors/http"
import { decodeAccessToken } from "./utils/jwt"

const authenticationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.header('Authorization')?.split(' ')
  const authHeaderScheme = authHeader ? authHeader[0] : undefined
  const authJwt = authHeader ? authHeader[1] : undefined

  if (authHeaderScheme != 'Bearer' || !authJwt) {
    return next(new HttpError(StatusCodes.UNAUTHORIZED, "Authorization header not provided"))
  }

  let decoded: { userId: number, token: string }
  try { decoded = decodeAccessToken(authJwt) as { userId: number, token: string } }
  catch (error) { return next(error) }

  res.locals.userId = decoded.userId
  next()
}

export default authenticationMiddleware