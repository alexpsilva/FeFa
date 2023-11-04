import getMandatoryEnv from "./getMandatory"

const ACCESS_TOKEN_SECRET = getMandatoryEnv('ACCESS_TOKEN_SECRET')

export {
  ACCESS_TOKEN_SECRET,
}