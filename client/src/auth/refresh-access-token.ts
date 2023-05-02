import { NextPageContext } from "next"

import { ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE } from "@/constants"
import request from '@/utils/request'

import getJWTCookie from "./get-jwt-cookie"
import setJWTCookie from "./set-jwt-cookie"

export default async function refreshAccessToken(nextCtx?: NextPageContext): Promise<string> {
  let refreshCookie = getJWTCookie(REFRESH_TOKEN_COOKIE, nextCtx)
  if (refreshCookie.error) { throw Error('Invalid refresh token') }

  const response = await request('/auth/refresh', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken: refreshCookie.data })
  })
  if (response.error) {
    // (to-do) handle error when fetching a new access token
    throw Error('Failed to fetch new access token')
  }

  const accessToken = response.response['accessToken']
  setJWTCookie(ACCESS_TOKEN_COOKIE, accessToken, nextCtx)
  return accessToken
}