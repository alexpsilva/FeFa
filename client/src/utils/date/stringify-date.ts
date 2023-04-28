const stringifyDate = (date: Date | string) => {
  if (!date) { return '' }

  const d = date instanceof Date ? date : new Date(date)
  return d.toLocaleDateString()
}

export default stringifyDate