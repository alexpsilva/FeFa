import { NextPage } from "next"
import dynamic from "next/dynamic"
import Head from "next/head"
import { useRouter } from "next/router"
import setJWTCookie from "@/auth/set-jwt-cookie"
import { ACCESS_TOKEN_COOKIE, POST_LOGIN_REDIRECT_QUERY, REFRESH_TOKEN_COOKIE } from "@/constants"
import request from "@/utils/request"
import { z } from "zod"

const Login: NextPage = () => {
  const GoogleSignIn = dynamic(() => import('@/components/features/google-signin'), { ssr: false })
  const router = useRouter()

  const onSignIn = async (credentials: google.accounts.id.CredentialResponse) => {
    const { response, error } = await request(
      `/auth/login`,
      z.object({ accessToken: z.string(), refreshToken: z.string() }),
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ googleToken: credentials.credential })
      }
    )

    if (error) { throw new Error(error.message) }

    setJWTCookie(ACCESS_TOKEN_COOKIE, response.accessToken)
    setJWTCookie(REFRESH_TOKEN_COOKIE, response.refreshToken)

    const redirectTo = router.query[POST_LOGIN_REDIRECT_QUERY]
    if (!redirectTo) {
      router.push('/')
    } else if (typeof redirectTo == 'string') {
      router.push(redirectTo)
    } else {
      router.push(redirectTo[0])
    }
  }

  return (
    <>
      <Head>
        <title>SignIn</title>
      </Head>
      <div className="h-screen flex justify-center items-center">
        <GoogleSignIn onSignIn={onSignIn} />
      </div>
    </>
  )
}

export default Login