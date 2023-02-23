const updateArray = <T,>(array: T[], criteria: (item: T, index?: number) => boolean, newValue: T): T[] => {
  const newArray: T[] = []
  for (let index = 0; index < array.length; index += 1) {
    const item = array[index]
    criteria(item, index) ? newArray.push(newValue) : newArray.push(item)
  }

  return newArray
}

export default updateArray