import { NextPage } from "next"
import dynamic from "next/dynamic"
import Head from "next/head"

const SignIn: NextPage = () => {
  const GoogleSignIn = dynamic(() => import('@/components/features/google-signin'), { ssr: false })

  return (
    <>
      <Head>
        <title>SignIn</title>
      </Head>
      <GoogleSignIn />
    </>
  )
}

export default SignIn