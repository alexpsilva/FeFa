const getMandatoryEnv = (...names: string[]) => {
  for (const name of names) {
    const value = process.env[name]
    if (value) { return value }
  }

  throw Error(`Environment variable ${names.join(' | ')} must be defined.`)
}

export default getMandatoryEnv