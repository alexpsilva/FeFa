const deleteFromArray = <T,>(array: T[], criteria: (item: T) => boolean): T[] => {
  const newArray: T[] = []
  for (const item of array) {
    criteria(item) ? null : newArray.push(item)
  }

  return newArray
}

export default deleteFromArray