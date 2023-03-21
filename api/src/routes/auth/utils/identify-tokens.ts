import { AuthToken } from "@prisma/client"

const identifyTokens = (tokens: AuthToken[]) => {
  const ageLimit = Number(process.env.AUTH_TOKEN_AGE_LIMIT_SECONDS)
  const idleLimit = Number(process.env.AUTH_TOKEN_IDLE_LIMIT_SECONDS)

  const expired = []
  const idle = []
  const valid = []

  const now = (new Date()).getTime()
  for (const token of tokens) {
    if (now - token.createdAt.getTime() > ageLimit) { expired.push(token) }
    else if (now - token.lastUsedAt.getTime() > idleLimit) { idle.push(token) }
    else { valid.push(token) }
  }

  return { expired, idle, valid }
}

export default identifyTokens