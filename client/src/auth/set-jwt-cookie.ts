import { setCookie } from "cookies-next"
import jwt from "jsonwebtoken"
import { NextPageContext } from "next"

const setJWTCookie = (key: string, token: string, nextCtx?: NextPageContext) => {
  const decoded = jwt.decode(token, { json: true })
  if (decoded === null) { throw Error(`Invalid token: ${token}`) }

  if (decoded.exp) {
    const expires = new Date(0)
    expires.setSeconds(decoded.exp)

    setCookie(key, token, { ...nextCtx, expires })
  } else {
    setCookie(key, token, nextCtx)
  }
}

export default setJWTCookie