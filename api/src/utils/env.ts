const getMandatoryEnv = (name: string) => {
  const value = process.env[name]
  if (!value) { throw Error(`Environment variable ${name} must be defined.`) }
  return value
}

const PORT = process.env.PORT
const LOG_LEVEL = process.env.LOG_LEVEL
const GOOGLE_CLIENT_ID = getMandatoryEnv('GOOGLE_CLIENT_ID')
const ACCESS_TOKEN_SECRET = getMandatoryEnv('ACCESS_TOKEN_SECRET')
const ACCESS_TOKEN_EXPIRES_SECONDS = Number(getMandatoryEnv('ACCESS_TOKEN_EXPIRES_SECONDS'))
const REFRESH_TOKEN_SECRET = getMandatoryEnv('REFRESH_TOKEN_SECRET')
const REFRESH_TOKEN_EXPIRES_SECONDS = Number(getMandatoryEnv('REFRESH_TOKEN_EXPIRES_SECONDS'))
const PAGINATION_PAGE_SIZE_LIMIT = Number(getMandatoryEnv('PAGINATION_PAGE_SIZE_LIMIT'))

export {
  PORT,
  LOG_LEVEL,
  GOOGLE_CLIENT_ID,
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRES_SECONDS,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRES_SECONDS,
  PAGINATION_PAGE_SIZE_LIMIT
}
export default getMandatoryEnv