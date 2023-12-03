import { API_URL } from "@/env/client"
import Stringifiable from "@/types/stringifiable"
import { StatusCodes } from "http-status-codes"
import { TypeOf, z } from "zod"
import stringifyError from "../error/stringify"
import { RequestOptions, RequestResult, HttpError } from "./types"

type QueryParams = { [key: string]: Stringifiable }
const buildUrl = (base: string, path: string, queryParams?: QueryParams) => {
  let url = `${base}${path}`

  if (queryParams) {
    const queryParamsString = Object.entries(queryParams)
      .map(([key, value]) => `${key}=${value}`)
      .join('&')
    url = `${url}?${queryParamsString}`
  }

  return url
}

const parseResponse = async <T extends z.ZodTypeAny>(response: Response, schema?: T) => {
  if (schema) {
    if (response.status == StatusCodes.NO_CONTENT) {
      throw Error('Received 204 (NO_CONTENT) while specifiying a schema')
    }
    return schema.parse(await response.json())
  }

  if (StatusCodes.NO_CONTENT) {
    return null
  }
  throw Error('Received a response body while no schema was specified')
}

const errorResponse = (error: HttpError) => ({ response: null, error })

const requestOrThrow = async <T extends z.ZodTypeAny>(
  path: string,
  options?: RequestOptions,
  schema?: T,
): Promise<RequestResult<TypeOf<T>>> => {
  const url = buildUrl(API_URL, path, options?.query)

  const response = await fetch(url, options)

  if (!response.ok) {
    return errorResponse({
      status: response.status,
      message: `Failed to fetch ${url} (${response.status})}`,
    })
  }

  return {
    response: await parseResponse(response, schema),
    error: null
  }
}

const request = async <T extends z.ZodTypeAny>(
  path: string,
  options?: RequestOptions,
  schema?: T,
): Promise<RequestResult<TypeOf<T>>> => {
  try {
    return await requestOrThrow(path, options, schema)
  } catch (error) {
    return errorResponse({
      message: stringifyError(error),
      status: StatusCodes.INTERNAL_SERVER_ERROR
    })
  }
}

export default request