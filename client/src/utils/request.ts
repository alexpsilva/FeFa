import Stringifiable from "@/types/stringifiable"
import { TypeOf, z } from "zod"

type HttpError = { message: string, status?: number }
type RequestResult<T> =
  { response: T, error: null }
  | { response: null, error: HttpError }

interface QueryStringOption {
  query?: { [key: string]: Stringifiable }
}
type RequestOptions = RequestInit & QueryStringOption

const request = async <T extends z.ZodTypeAny>(
  path: string,
  schema: T | null,
  options?: RequestOptions
): Promise<RequestResult<null extends T ? null : TypeOf<T>>> => {

  const base = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL
  let url = `${base}${path}`

  const querystring = Object.entries(options?.query ?? {})
    .map(([key, value]) => `${key}=${value}`)
    .join('&')
  if (querystring) url = `${url}?${querystring}`

  const response = await fetch(url, options)

  if (!response.ok) {
    return {
      response: null, error: {
        status: response.status,
        message: `Failed to fetch ${url} (${response.status}): ${JSON.stringify(response.body)}`
      }
    }
  }

  if (schema === null) {
    return { response: null, error: null }
  }

  const responseJson = await response.json()
  const parseResult = schema.safeParse(responseJson)
  if (!parseResult.success) {
    return {
      response: null, error: {
        message: `Fetch response did not meet the expected schema. \nresponse: ${JSON.stringify(responseJson)} \nerror: ${JSON.stringify(parseResult.error.format())}`
      }
    }
  }

  return { response: parseResult.data, error: null }
}

export type { RequestOptions, RequestResult }
export default request