import { AuthToken } from "@prisma/client"
import { NextFunction, Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import HttpError from "../../errors/http"
import prisma from "../../prisma"
import { JwtDecode } from "./utils/jwt"

const authenticationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.header('Authorization')?.split(' ')
  const authHeaderScheme = authHeader ? authHeader[0] : undefined
  const authJwt = authHeader ? authHeader[1] : undefined

  if (authHeaderScheme != 'Bearer' || !authJwt) {
    return next(new HttpError(StatusCodes.UNAUTHORIZED, "Authorization header not provided"))
  }

  let decoded: { userId: number, token: string }
  try { decoded = JwtDecode(authJwt) as { userId: number, token: string } }
  catch (error) { return next(error) }

  // (to-do) Refresh expired tokens as long as they abide to AUTH_TOKEN_AGE_LIMIT_SECONDS
  //
  // let dbToken: AuthToken | null
  // try { dbToken = await prisma.authToken.findUnique({ where: { value: decoded.token } }) }
  // catch (error) { return next(error) }

  // if (!dbToken || dbToken.userId != decoded.userId) {
  //   return next(new HttpError(StatusCodes.UNAUTHORIZED, "Invalid authentication token"))
  // }
  res.locals.userId = decoded.userId
  next()
}

export default authenticationMiddleware