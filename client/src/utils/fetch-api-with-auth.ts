import { ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE } from "@/constants"
import { StatusCodes } from "http-status-codes"
import getJWTCookie from "./get-jwt-cookie"
import fetchAPI from './fetch-api'
import setJWTCookie from "./set-jwt-cookie"
import { NextPageContext } from "next"

const refreshAccessToken = async (nextCtx?: NextPageContext): Promise<string> => {
  let refreshCookie = getJWTCookie(REFRESH_TOKEN_COOKIE, nextCtx)
  if (refreshCookie.error) { throw Error('Invalid refresh token') }

  const response = await fetchAPI('/auth/refresh', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken: refreshCookie.data })
  })
  if (response.error) {
    // (to-do) handle error when fetching a new access token
    throw Error('Failed to fetch new access token')
  }

  const accessToken = response.data['accessToken']
  setJWTCookie(ACCESS_TOKEN_COOKIE, accessToken, nextCtx)
  return accessToken
}

const authorizedFetch = (
  accessToken: string,
  path: string,
  options?: RequestInit,
) => {
  const optionsWithAuth = {
    ...options, headers: {
      ...options?.headers,
      Authorization: `Bearer ${accessToken}`
    }
  }
  return fetchAPI(path, optionsWithAuth)
}

const fetchAPIWithAuth = async (path: string, options?: RequestInit, nextCtx?: NextPageContext) => {
  const cookie = getJWTCookie(ACCESS_TOKEN_COOKIE)
  let accessToken = cookie.error ? await refreshAccessToken(nextCtx) : cookie.data

  let response = await authorizedFetch(accessToken, path, options)
  if (response?.error?.status == StatusCodes.UNAUTHORIZED) {
    response = await authorizedFetch(await refreshAccessToken(nextCtx), path, options)
  }

  return response
}

export default fetchAPIWithAuth