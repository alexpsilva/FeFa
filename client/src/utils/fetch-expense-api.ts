import { StatusCodes } from "http-status-codes"

const requestExpenseAPI = async (path: string, options?: RequestInit | undefined) => {
  const url = `${process.env.NEXT_PUBLIC_EXPENSE_API_URL}${path}`
  const response = await fetch(url, options)

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url} (${response.status}): ${response.body}`)
  }

  if (response.status == StatusCodes.NO_CONTENT) {
    return null
  }
  return response.json()
}

export default requestExpenseAPI