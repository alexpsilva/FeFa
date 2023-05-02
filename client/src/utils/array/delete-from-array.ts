const deleteFromArray = <T,>(array: T[], criteria: (item: T, index: number) => boolean): T[] => {
  const newArray: T[] = []
  for (const index in array) {
    const item = array[index]
    criteria(item, Number(index)) ? null : newArray.push(item)
  }

  return newArray
}

export default deleteFromArray