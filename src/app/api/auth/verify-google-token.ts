import { GOOGLE_CLIENT_ID } from "@/env"
import { OAuth2Client, TokenPayload } from "google-auth-library"

const verifyGoogleToken = async (token: string)
  : Promise<{ payload: TokenPayload } | { error: string }> => {
  const client = new OAuth2Client(GOOGLE_CLIENT_ID)

  let ticket
  try { ticket = await client.verifyIdToken({ audience: GOOGLE_CLIENT_ID, idToken: token }) }
  catch { return { error: "Google SignIn validation failed" } }

  const payload = ticket.getPayload()
  if (!payload) { return { error: "No available email from Google SignIn" } }

  return { payload }
}

export default verifyGoogleToken