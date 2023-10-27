import { Prisma } from "@prisma/client"
import { NextFunction, Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import HttpError from "../errors/http"
import { logger } from "../utils/logger"

const errorMiddleware = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let status;
  let message;

  if (error instanceof Prisma.PrismaClientValidationError) {
    status = StatusCodes.BAD_REQUEST
    message = error.message
  } else if (error instanceof HttpError) {
    status = error.status
    message = error.message
  } else if (error instanceof Error) {
    status = StatusCodes.INTERNAL_SERVER_ERROR
    message = error.message
  }

  if (status) {
    logger.error(message)
    res.status(status)
    res.send(message)
    return next()
  }
  return next(error)
}

export default errorMiddleware