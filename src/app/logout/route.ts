import { ACCESS_TOKEN_COOKIE, IS_ACTIVE_COOKIE } from "@/constants"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const response = NextResponse.redirect(new URL('/login', request.url))
  response.cookies.delete(ACCESS_TOKEN_COOKIE)
  response.cookies.delete(IS_ACTIVE_COOKIE)

  return response
}