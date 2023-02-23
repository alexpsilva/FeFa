import { NextFunction, Request, Response } from "express"
import { getReasonPhrase } from "http-status-codes"
import { logger } from "../utils/logger"


export default function loggerMiddleware(req: Request, res: Response, next: NextFunction) {
  const method = req.method
  const path = req.path
  res.on('finish', () => {
    const statusCode = res.statusCode
    const reason = getReasonPhrase(statusCode)
    logger.info(`${method} ${path} => ${statusCode} ${reason}`)
  })
  next()
}