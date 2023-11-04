type CharacterSet = 'numbers' | 'alphabet' | 'all'
const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 'u', 'w', 'v', 'x', 'y', 'z']

const inCharaterSet = (characterSet: CharacterSet, target: string) => {
  if (characterSet === 'all') { return true }
  if (characterSet === 'numbers') { return target in numbers }
  if (characterSet === 'alphabet') { return target.toLowerCase() in alphabet }
}

// In this simple input mask implementation, we disallow any characters 
// that were used in the mask as fixed characters.

const applyMask = (mask: string, maskSlot: string, value: string, allow?: CharacterSet): string => {
  const fixedCharacters = value
    .replaceAll(maskSlot, '') // Remove mask slot
    .split('') // Cast to array
    .filter((value, index, array) => array.indexOf(value) === index); // Remove duplicates

  // Clean target from mask values
  let target = value
  fixedCharacters.
    filter(i => mask.includes(i)).
    forEach(i => { target = target.replaceAll(i, '') })

  // Apply fresh mask
  let maskedValue = ''
  let targetIndex = 0
  for (let maskIndex = 0; maskIndex < mask.length; maskIndex++) {
    if (targetIndex >= target.length) { break }

    const targetCharacter = target[targetIndex]
    const maskCharacter = mask[maskIndex]

    if (!!allow && !inCharaterSet(allow, targetCharacter)) {
      targetIndex++
      continue
    }

    if (maskCharacter === maskSlot) {
      maskedValue += targetCharacter
      targetIndex++
    }
    else {
      maskedValue += maskCharacter
    }
  }

  return maskedValue
}

export default applyMask