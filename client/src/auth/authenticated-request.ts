import { NextPageContext } from "next"
import { StatusCodes } from "http-status-codes"

import { ACCESS_TOKEN_COOKIE } from "@/constants"
import request, { RequestOptions } from '@/utils/request'

import getJWTCookie from "./get-jwt-cookie"
import refreshAccessToken from "./refresh-access-token"
import { z } from "zod"

const addAuthorizationHeader = (
  accessToken: string,
  options?: RequestInit,
) => {
  return {
    ...options, headers: {
      ...options?.headers,
      Authorization: `Bearer ${accessToken}`
    }
  }
}

const authenticatedRequest = async <T extends z.ZodTypeAny>(
  path: string,
  schema: T | null,
  options?: RequestOptions,
  nextCtx?: NextPageContext,
) => {
  const cookie = getJWTCookie(ACCESS_TOKEN_COOKIE)
  let accessToken = cookie.error ? await refreshAccessToken(nextCtx) : cookie.data

  let response = await request(path, schema, addAuthorizationHeader(accessToken, options))
  if (response?.error?.status == StatusCodes.UNAUTHORIZED) {
    accessToken = await refreshAccessToken(nextCtx)
    response = await request(path, schema, addAuthorizationHeader(accessToken, options))
  }

  return response
}

export default authenticatedRequest