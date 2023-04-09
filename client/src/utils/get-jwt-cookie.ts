import { getCookie } from "cookies-next"
import jwt from "jsonwebtoken"
import { NextPageContext } from "next"

type Result = { data: string, error: null } | { data: null, error: Error }
const getJWTCookie = (key: string, nextCtx?: NextPageContext): Result => {
  const token = getCookie(key, nextCtx)
  if (typeof token != 'string') {
    return { data: null, error: Error(`Invalid token: ${token}`) }
  }

  const decoded = jwt.decode(token, { json: true })
  if (decoded === null) {
    return { data: null, error: Error(`Invalid token: ${decoded}`) }
  }

  if (decoded.exp && new Date().getSeconds() > decoded.exp) {
    return { data: null, error: Error(`Token expired: ${JSON.stringify(decoded)}`) }
  }

  return { data: token, error: null }
}

export default getJWTCookie