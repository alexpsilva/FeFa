import { StatusCodes } from "http-status-codes"

type HttpError = { message: string, status: number }
type Result = { data: any, error: null } | { data: null, error: HttpError }
// type Result = [null, HttpError] | [any, null]
const fetchAPI = async (path: string, options?: RequestInit | undefined): Promise<Result> => {
  const base = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL
  const url = `${base}${path}`
  const response = await fetch(url, options)

  response.status
  if (!response.ok) {
    return {
      data: null, error: {
        status: response.status,
        message: `Failed to fetch ${url} (${response.status}): ${JSON.stringify(response.body)}`
      }
    }
  }

  if (response.status == StatusCodes.NO_CONTENT) {
    return { data: null, error: null }
  }
  return { data: await response.json(), error: null }
}

export default fetchAPI