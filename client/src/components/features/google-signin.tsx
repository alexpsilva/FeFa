import Script from "next/script"

const GoogleSignIn = () => {
  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
  const loginUrl = `${process.env.NEXT_PUBLIC_API_URL}/login`
  console.log(loginUrl)

  // const onSignIn = (a: any) => {
  //   console.log(a)
  // }
  return <>
    <Script src="https://accounts.google.com/gsi/client" async defer></Script>
    <div
      id="g_id_onload"
      data-client_id={googleClientId}
      // data-callback="onSignIn"
      data-login_uri={loginUrl}
    >
    </div>
    <div className="g_id_signin" data-type="standard"></div>
    {/* <Script id="google-sign-in" strategy="afterInteractive">
      {`function onSignIn(a){console.log(JSON.stringify(a))}`}
    </Script> */}
  </>
}

export default GoogleSignIn