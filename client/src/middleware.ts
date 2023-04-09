import { NextRequest, NextResponse } from "next/server";
import { POST_LOGIN_REDIRECT_QUERY, REFRESH_TOKEN_COOKIE } from "./constants";

export function middleware(request: NextRequest) {
  const refreshToken = request.cookies.get(REFRESH_TOKEN_COOKIE)?.value

  if (!refreshToken) {
    const originalPath = new URL(request.url).pathname
    return NextResponse.redirect(
      new URL(`/login?${POST_LOGIN_REDIRECT_QUERY}=${originalPath}`, request.url)
    )
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - login (login page)
     * - api (API routes)
     * - _next (Next internals)
     * - favicon.ico (favicon file)
     */
    '/((?!login|api|_next/|favicon.ico).*)',
  ],
}