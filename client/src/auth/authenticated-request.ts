import { NextPageContext } from "next"
import { StatusCodes } from "http-status-codes"

import { ACCESS_TOKEN_COOKIE } from "@/constants"
import request, { QueryStringOption } from '@/utils/request'

import getJWTCookie from "./get-jwt-cookie"
import refreshAccessToken from "./refresh-access-token"

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

const authenticatedRequest = async (
  path: string, options?: RequestInit & QueryStringOption, nextCtx?: NextPageContext
) => {
  const cookie = getJWTCookie(ACCESS_TOKEN_COOKIE)
  let accessToken = cookie.error ? await refreshAccessToken(nextCtx) : cookie.data

  let response = await request(path, addAuthorizationHeader(accessToken, options))
  if (response?.error?.status == StatusCodes.UNAUTHORIZED) {
    accessToken = await refreshAccessToken(nextCtx)
    response = await request(path, addAuthorizationHeader(accessToken, options))
  }

  return response
}

export default authenticatedRequest