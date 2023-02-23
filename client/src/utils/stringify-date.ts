const stringifyDate = (date: Date | string) => {
  const d = date instanceof Date ? date : new Date(date)
  return `${d.getDay()}/${d.getMonth()}/${d.getFullYear()}`
}

export default stringifyDate