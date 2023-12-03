import { ACCESS_TOKEN_COOKIE } from "@/constants"
import { decodeAccessToken } from "@/utils/jwt"
import { StatusCodes } from "http-status-codes"
import { NextRequest, NextResponse } from "next/server"

const authenticatedEndpoint = <T>(
  handler: (req: NextRequest, userId: number, params: T) => Promise<NextResponse>
) => {
  return async (request: NextRequest, params: T) => {
    console.log(`API: ${request.method} ${(new URL(request.url)).pathname}`)
    const accessToken = await request.cookies.get(ACCESS_TOKEN_COOKIE)
    if (!accessToken) {
      return NextResponse.json('Unauthorized', { status: StatusCodes.UNAUTHORIZED })
    }

    let decoded: { userId: number, token: string }
    try { decoded = decodeAccessToken(accessToken.value) as { userId: number, token: string } }
    catch (error) { return NextResponse.json(error, { status: StatusCodes.FORBIDDEN }) }

    return handler(request, decoded.userId, params)
  }
}


export default authenticatedEndpoint