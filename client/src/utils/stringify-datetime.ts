const stringifyDatetime = (date: Date | string) => {
  const d = date instanceof Date ? date : new Date(date)
  return `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()} ${d.getDay()}/${d.getMonth()}/${d.getFullYear()}`
}

export default stringifyDatetime