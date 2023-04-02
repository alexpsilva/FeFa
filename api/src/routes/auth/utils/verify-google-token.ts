import { OAuth2Client, TokenPayload } from "google-auth-library"

const verifyGoogleToken = async (token: string)
  : Promise<{ payload: TokenPayload } | { error: string }> => {
  const clientId = process.env.GOOGLE_CLIENT_ID

  const client = new OAuth2Client(clientId)

  let ticket
  try { ticket = await client.verifyIdToken({ audience: clientId, idToken: token }) }
  catch { return { error: "Google SignIn validation failed" } }

  const payload = ticket.getPayload()
  if (!payload) { return { error: "No available email from Google SignIn" } }

  return { payload }
}

export default verifyGoogleToken