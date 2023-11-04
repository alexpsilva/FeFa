import { GOOGLE_CLIENT_ID } from "@/env/client"
import { useEffect } from "react"

interface Props {
  onSignIn: (token: google.accounts.id.CredentialResponse) => void
}

const GoogleSignIn = ({ onSignIn }: Props) => {
  const initializeGoogleSignIn = () => {

    google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: onSignIn,
      prompt_parent_id: "google_signin_container",
    })
    google.accounts.id.prompt()
  }

  useEffect(() => initializeGoogleSignIn())

  return <div id="google_signin_container" />
}

export default GoogleSignIn