const getMandatoryEnv = (name: string) => {
  const value = process.env[name]
  if (!value) { throw Error(`Environment variable ${name} must be defined.`) }
  return value
}

const NODE_ENV = process.env['NODE_ENV']
const GOOGLE_CLIENT_ID = getMandatoryEnv('GOOGLE_CLIENT_ID')
const ACCESS_TOKEN_SECRET = getMandatoryEnv('ACCESS_TOKEN_SECRET')
const ACCESS_TOKEN_EXPIRES_SECONDS = Number(getMandatoryEnv('ACCESS_TOKEN_EXPIRES_SECONDS'))
const IS_ACTIVE_COOKIE_EXPIRES_SECONDS = Number(getMandatoryEnv('IS_ACTIVE_COOKIE_EXPIRES_SECONDS'))

export {
  NODE_ENV,
  GOOGLE_CLIENT_ID,
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRES_SECONDS,
  IS_ACTIVE_COOKIE_EXPIRES_SECONDS,
}