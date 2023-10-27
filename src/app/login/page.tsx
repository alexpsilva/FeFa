'use client'

import dynamic from "next/dynamic"
import { useRouter, useSearchParams } from "next/navigation"
import { POST_LOGIN_REDIRECT_QUERY } from "@/constants"
import { z } from "zod"
import Script from "next/script"
import requestFromClient from "@/utils/request/fromClient"

export default function Login() {
  const GoogleSignIn = dynamic(() => import('@/components/features/google-signin'), { ssr: false })
  const router = useRouter()
  const query = useSearchParams()

  const onSignIn = async (credentials: google.accounts.id.CredentialResponse) => {
    const { response, error } = await requestFromClient(
      `/api/auth/login`,
      z.object({ accessToken: z.string(), refreshToken: z.string() }),
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ googleToken: credentials.credential })
      }
    )

    if (error) { throw new Error(error.message) }

    const redirectTo = query.get(POST_LOGIN_REDIRECT_QUERY)
    if (!redirectTo || redirectTo === '/logout') {
      return router.push('/')
    }
    return router.push(redirectTo)
  }

  return (
    <>
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="beforeInteractive"
        async defer
      />
      <main className="h-screen flex justify-center items-center">
        <GoogleSignIn onSignIn={onSignIn} />
      </main>
    </>
  )
}