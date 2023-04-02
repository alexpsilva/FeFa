import jwt from 'jsonwebtoken'
import getMandatoryEnv from '../../../utils/env'

const encodingAlgorithm: jwt.Algorithm = 'HS256'

const JwtEncode = (payload: string | object | Buffer) => {
  const secret = getMandatoryEnv('AUTH_TOKEN_SECRET')
  const expiresIn = getMandatoryEnv('AUTH_TOKEN_IDLE_LIMIT_SECONDS')
  return jwt.sign(payload, secret, { algorithm: encodingAlgorithm, expiresIn })
}

const JwtDecode = (token: string) => {
  const secret = getMandatoryEnv('AUTH_TOKEN_SECRET')
  return jwt.verify(token, secret, { algorithms: [encodingAlgorithm] })
}

export { JwtEncode, JwtDecode } 