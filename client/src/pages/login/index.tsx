import { NextPage } from "next"
import dynamic from "next/dynamic"
import Head from "next/head"

const Login: NextPage = () => {
  const GoogleLogin = dynamic(() => import('@/components/features/google-login'), { ssr: false })

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <GoogleLogin />
    </>
  )
}

export default Login