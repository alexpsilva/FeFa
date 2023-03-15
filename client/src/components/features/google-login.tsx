import Script from "next/script"

const GoogleLogin = () => {
  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID

  // const onSignIn = (a: any) => {
  //   console.log(a)
  // }
  return <>
    <Script src="https://accounts.google.com/gsi/client" async defer></Script>
    <div
      id="g_id_onload"
      data-client_id={googleClientId}
      data-callback="onSignIn">
    </div>
    <div className="g_id_signin" data-type="standard"></div>
    <Script id="google-sign-in" strategy="afterInteractive">
      {`function onSignIn(a){console.log(JSON.stringify(a))}`}
    </Script>
  </>
}

export default GoogleLogin