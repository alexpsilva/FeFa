import { AuthToken } from "@prisma/client"
import prisma from "../../../prisma"
import identifyTokens from "./identify-tokens"


const deleteExpiredTokens = (tokens: AuthToken[]): Promise<void> => {
  const { expired, idle, valid } = identifyTokens(tokens)

  let deleteExpired = new Promise(() => { })
  if (expired.length) {
    deleteExpired = prisma.authToken.deleteMany({ where: { id: { in: expired.map(i => i.id) } } })
  }

  return (async () => { await deleteExpired })()
}

export default deleteExpiredTokens