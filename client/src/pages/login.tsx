import fetchAPI from "@/utils/fetch-api"
import { NextPage } from "next"
import dynamic from "next/dynamic"
import Head from "next/head"
import { useRouter } from "next/router"

const Login: NextPage = () => {
  const GoogleSignIn = dynamic(() => import('@/components/features/google-signin'), { ssr: false })
  const router = useRouter()

  const onSignIn = async (credentials: google.accounts.id.CredentialResponse) => {
    const [authToken, error] = await fetchAPI(`/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ googleToken: credentials.credential })
    })
    console.log(JSON.stringify(authToken), error)
  }

  return (
    <>
      <Head>
        <title>SignIn</title>
      </Head>
      <GoogleSignIn onSignIn={onSignIn} />
    </>
  )
}

export default Login