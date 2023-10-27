import { StatusCodes } from "http-status-codes";

class HttpError extends Error {
  status: StatusCodes
  message: string

  constructor(status: StatusCodes, message: string) {
    super(message)
    this.status = status
    this.message = message
  }
}

export default HttpError