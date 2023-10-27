import jwt from 'jsonwebtoken'
import {
  ACCESS_TOKEN_EXPIRES_SECONDS,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRES_SECONDS,
  REFRESH_TOKEN_SECRET
} from '../../../utils/env'

const encodingAlgorithm: jwt.Algorithm = 'HS256'

const encodeAccessToken = (userId: number) => {
  return jwt.sign(
    { userId },
    ACCESS_TOKEN_SECRET,
    {
      algorithm: encodingAlgorithm,
      expiresIn: ACCESS_TOKEN_EXPIRES_SECONDS,
    }
  )
}

const decodeAccessToken = (token: string) => {
  return jwt.verify(token, ACCESS_TOKEN_SECRET, { algorithms: [encodingAlgorithm] })
}

const encodeRefreshToken = (value: string) => {
  return jwt.sign(
    { value },
    REFRESH_TOKEN_SECRET,
    {
      algorithm: encodingAlgorithm,
      expiresIn: REFRESH_TOKEN_EXPIRES_SECONDS
    }
  )
}

const decodeRefreshToken = (token: string) => {
  return jwt.verify(token, REFRESH_TOKEN_SECRET, { algorithms: [encodingAlgorithm] })
}

export { encodeAccessToken, decodeAccessToken, encodeRefreshToken, decodeRefreshToken } 