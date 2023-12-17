import 'server-only'

import { ACCESS_TOKEN_COOKIE } from "@/constants"
import { cookies } from "next/headers"
import authorizeToken from "./authorize-token"

const protectedPage = <T, K>(
  page: (props: T, userId: number) => K
) => {
  return (props: T) => {
    const accessToken = cookies().get(ACCESS_TOKEN_COOKIE)
    if (!accessToken) {
      throw Error('Unauthorized')
    }

    let userId: number
    try { userId = authorizeToken(accessToken.value) }
    catch (error) { throw Error('Forbidden') }

    return page(props, userId)
  }
}

export default protectedPage