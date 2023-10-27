import Stringifiable from "@/types/stringifiable"

export type HttpError = { message: string, status?: number }
export type RequestResult<T> =
  { response: T, error: null }
  | { response: null, error: HttpError }

export interface QueryStringOption {
  query?: { [key: string]: Stringifiable }
}
export type RequestOptions = RequestInit & QueryStringOption