const getMandatoryEnv = (name: string) => {
  const value = process.env[name]
  if (!value) { throw Error(`Environment variable ${name} must be defined.`) }
  return value
}

export default getMandatoryEnv