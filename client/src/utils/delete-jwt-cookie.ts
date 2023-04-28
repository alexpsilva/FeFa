import { deleteCookie } from "cookies-next"
import { NextPageContext } from "next"

const deleteJWTCookie = (key: string, nextCtx?: NextPageContext) => {
  deleteCookie(key, nextCtx)
}

export default deleteJWTCookie