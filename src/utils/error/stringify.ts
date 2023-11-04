const stringifyError = (error: unknown): string => {
  if (!(error instanceof Error)) {
    return String(error)
  }

  let errorString = `${error.name}: ${error.message}`
  if (error.cause) errorString = `${errorString}\n${error.cause}`
  if (error.stack) errorString = `${errorString}\n${error.stack}`
  return errorString
}

export default stringifyError