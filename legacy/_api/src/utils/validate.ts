import { ClassConstructor, plainToClass } from "class-transformer";
import { validate as validateClass } from "class-validator";
import { StatusCodes } from "http-status-codes";
import HttpError from "../errors/http";

const validate = async <T extends object,>(type: ClassConstructor<T>, body: object): Promise<T> => {
  const parsedBody = plainToClass(type, body)
  const errors = await validateClass(parsedBody)

  if (errors.length > 0) {
    const message = errors
      .map((error) => String(error))
      .join('\n')

    throw new HttpError(StatusCodes.BAD_REQUEST, message)
  }
  return parsedBody
}

export default validate