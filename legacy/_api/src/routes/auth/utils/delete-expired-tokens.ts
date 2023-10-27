import { RefreshToken } from "@prisma/client"
import prisma from "../../../prisma"
import dateDifference from "../../../utils/date-difference"
import { REFRESH_TOKEN_EXPIRES_SECONDS } from "../../../utils/env"


const deleteExpiredTokens = async (tokens: RefreshToken[]): Promise<void> => {
  const expired = tokens.filter(
    token =>
      dateDifference(new Date(), token.createdAt) > REFRESH_TOKEN_EXPIRES_SECONDS
  )

  if (!expired.length) { return }

  await prisma.refreshToken.deleteMany({
    where: { id: { in: expired.map(i => i.id) } }
  })
}

export default deleteExpiredTokens