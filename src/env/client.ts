import getMandatoryEnv from "./getMandatory"

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL
const NEXT_PUBLIC_GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID

const API_URL = NEXT_PUBLIC_API_URL || getMandatoryEnv('API_URL')
const GOOGLE_CLIENT_ID = NEXT_PUBLIC_GOOGLE_CLIENT_ID || getMandatoryEnv('GOOGLE_CLIENT_ID')

export {
  API_URL,
  GOOGLE_CLIENT_ID,
}