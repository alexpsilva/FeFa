import Stringifiable from "@/types/stringifiable"
import { StatusCodes } from "http-status-codes"

type JSONPrimitive = string | number | boolean | null
interface Nested<T> { [key: string]: T | T[] | Nested<T> }

type HttpResponse = JSONPrimitive | JSONPrimitive[] | Nested<JSONPrimitive>
type HttpError = { message: string, status: number }
type RequestResult = { response: HttpResponse, error: null } | { response: null, error: HttpError }

interface QueryStringOption {
  query?: { [key: string]: Stringifiable }
}

const request = async (path: string, options?: RequestInit & QueryStringOption): Promise<RequestResult> => {
  const base = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL
  let url = `${base}${path}`

  const querystring = Object.entries(options?.query ?? {})
    .map(([key, value]) => `${key}=${value}`)
    .join('&')
  if (querystring) url = `${url}?${querystring}`

  const response = await fetch(url, options)

  response.status
  if (!response.ok) {
    return {
      response: null, error: {
        status: response.status,
        message: `Failed to fetch ${url} (${response.status}): ${JSON.stringify(response.body)}`
      }
    }
  }

  if (response.status == StatusCodes.NO_CONTENT) {
    return { response: null, error: null }
  }
  return { response: await response.json(), error: null }
}

export type { QueryStringOption, RequestResult }
export default request