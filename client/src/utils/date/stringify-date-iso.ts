const stringifyDateISO = (date: Date | string) => {
  const d = date instanceof Date ? date : new Date(date)
  return d.toISOString().split('T')[0]
}

export default stringifyDateISO