import { StatusCodes } from "http-status-codes"

const fetchAPI = async (path: string, options?: RequestInit | undefined) => {
  const url = `http://${process.env.EXPENSE_API_URL}${path}`
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