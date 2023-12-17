import { decodeAccessToken } from "../jwt"

const authorizeToken = (accessToken: string): number => {
  const decoded = decodeAccessToken(accessToken) as { userId: number, token: string }
  return decoded.userId
}

export default authorizeToken