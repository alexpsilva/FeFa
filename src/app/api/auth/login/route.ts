import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";
import prisma from "../../prisma";
import { encodeAccessToken } from "@/utils/jwt";
import verifyGoogleToken from "../verify-google-token";
import { ACCESS_TOKEN_COOKIE, ACCESS_TOKEN_EXPIRES_SECONDS, COOKIE_OPTIONS, IS_ACTIVE_COOKIE, IS_ACTIVE_COOKIE_EXPIRES_SECONDS } from "@/constants";

export async function POST(request: Request) {
  const body = await request.json()
  // (to-do) validate body with zod

  const googleToken = await verifyGoogleToken(body.googleToken)
  if ('error' in googleToken) {
    return NextResponse.json(
      { error: googleToken.error },
      { status: StatusCodes.UNAUTHORIZED }
    )
  }

  const user = await prisma.user.findUnique({
    where: { email: googleToken.payload.email }
  })
  if (!user) {
    return NextResponse.json(
      { error: "Unauthorized email" },
      { status: StatusCodes.UNAUTHORIZED }
    )
  }

  const response = new NextResponse(null, { status: StatusCodes.NO_CONTENT })

  response.cookies.set(
    ACCESS_TOKEN_COOKIE,
    encodeAccessToken(user.id, ACCESS_TOKEN_EXPIRES_SECONDS),
    { maxAge: ACCESS_TOKEN_EXPIRES_SECONDS, ...COOKIE_OPTIONS },
  )

  response.cookies.set(
    IS_ACTIVE_COOKIE,
    'is_active',
    { maxAge: IS_ACTIVE_COOKIE_EXPIRES_SECONDS, ...COOKIE_OPTIONS }
  )

  return response
}