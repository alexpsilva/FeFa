import { StatusCodes } from "http-status-codes"

const fetchAPI = async (path: string, options?: RequestInit | undefined) => {
  const base = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL
  const url = `${base}${path}`
  const response = await fetch(url, options)

  if (!response.ok) {
    return [null, `Failed to fetch ${url} (${response.status}): ${response.body}`]
  }

  if (response.status == StatusCodes.NO_CONTENT) {
    return [null, null]
  }
  return [await response.json(), null]
}

export default fetchAPI