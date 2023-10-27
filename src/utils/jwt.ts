import jwt from 'jsonwebtoken'
import { ACCESS_TOKEN_SECRET } from '@/env'

const encodingAlgorithm: jwt.Algorithm = 'HS256'

export function encodeAccessToken(userId: number, expiresIn: number): string {
  return jwt.sign(
    { userId },
    ACCESS_TOKEN_SECRET,
    { algorithm: encodingAlgorithm, expiresIn },
  )
}

export function decodeAccessToken(token: string): string | jwt.JwtPayload {
  return jwt.verify(
    token,
    ACCESS_TOKEN_SECRET,
    { algorithms: [encodingAlgorithm] },
  )
}
