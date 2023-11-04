import { NextRequest, NextResponse } from "next/server";
import { ACCESS_TOKEN_COOKIE, COOKIE_OPTIONS, IS_ACTIVE_COOKIE, IS_ACTIVE_COOKIE_EXPIRES_SECONDS, POST_LOGIN_REDIRECT_QUERY } from "./constants";

export async function middleware(request: NextRequest) {
  console.log(`middleware: ${request.method} ${request.url}`)

  const isAuthorized = !!request.cookies.get(ACCESS_TOKEN_COOKIE)?.value
  const isActive = !!request.cookies.get(IS_ACTIVE_COOKIE)?.value

  if (!isAuthorized || !isActive) {
    const originalPath = new URL(request.url).pathname
    return NextResponse.redirect(
      new URL(`/login?${POST_LOGIN_REDIRECT_QUERY}=${originalPath}`, request.url)
    )
  }

  const response = NextResponse.next()
  response.cookies.set(
    IS_ACTIVE_COOKIE,
    'is_active',
    { maxAge: IS_ACTIVE_COOKIE_EXPIRES_SECONDS, ...COOKIE_OPTIONS }
  )

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - login (login page)
     * - _next (Next internals)
     * - favicon.ico (favicon file)
     */
    '/((?!api|login|_next/|favicon.ico).*)',
  ],
}