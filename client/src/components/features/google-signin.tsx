import { useEffect } from "react"

interface Props {
  onSignIn: (token: google.accounts.id.CredentialResponse) => void
}

const GoogleSignIn = ({ onSignIn }: Props) => {
  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string
  const loginUrl = `${process.env.NEXT_PUBLIC_API_URL}/auth/login`

  const initializeGoogleSignIn = () => {
    google.accounts.id.initialize({
      client_id: googleClientId,
      callback: onSignIn,
      prompt_parent_id: "google_signin_container",
    })
    google.accounts.id.prompt()
  }

  useEffect(() => initializeGoogleSignIn(), [])

  return <div id="google_signin_container" />
}

export default GoogleSignIn