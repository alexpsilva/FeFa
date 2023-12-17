import 'server-only'

import { ACCESS_TOKEN_COOKIE } from "@/constants"
import { StatusCodes } from "http-status-codes"
import { NextRequest, NextResponse } from "next/server"
import authorizeToken from "./authorize-token"

const protectedRoute = <T>(
  handler: (req: NextRequest, userId: number, params: T) => Promise<NextResponse>
) => {
  return async (request: NextRequest, params: T) => {
    console.log(`Route Handler: ${request.method} ${(new URL(request.url)).pathname}`)
    const accessToken = await request.cookies.get(ACCESS_TOKEN_COOKIE)
    if (!accessToken) {
      return NextResponse.json('Unauthorized', { status: StatusCodes.UNAUTHORIZED })
    }

    let userId: number
    try { userId = authorizeToken(accessToken.value) }
    catch (error) { return NextResponse.json(error, { status: StatusCodes.FORBIDDEN }) }

    return handler(request, userId, params)
  }
}


export default protectedRoute