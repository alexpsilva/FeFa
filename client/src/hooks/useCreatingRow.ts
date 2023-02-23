import updateArray from "@/utils/update-array"
import { useState } from "react"

type Result<T> = [
  Partial<T>[],
  (index: number, col: keyof Partial<T>, newValue: any) => void,
  () => void
]

const useCreatingRow = <T,>(): Result<T> => {
  const [creating, _setCreating] = useState<Partial<T>[]>([{}])

  const setCreatingValue = (index: number, col: keyof T, newValue: any) => {
    const item = creating[index]
    const newCreatingData = updateArray(
      creating,
      (_, i) => i == index,
      { ...item, [col]: newValue }
    )

    index == creating.length - 1 ?
      _setCreating([...newCreatingData, {}])
      : _setCreating(newCreatingData)
  }

  const discardCreating = () => _setCreating([{}])

  return [creating, setCreatingValue, discardCreating]
}

export default useCreatingRow