import { useState } from "react"

type SetDraftOptions = { save?: boolean }
type Result<T> = [
  Boolean,
  T,
  (newDraft: T, options?: SetDraftOptions) => void,
  () => void,
]

// Given a initial `target`, holds a draft that may be updated without altering the original data
const useDraft = <T,>(initial: T): Result<T> => {
  const [saved, setSaved] = useState<T>(initial)
  const [draft, _setDraft] = useState<T>(initial)
  const [isDrafting, setIsDrafting] = useState<Boolean>(false)

  const discardDraft = () => {
    _setDraft(saved)
    setIsDrafting(false)
  }

  const setDraft = (newDraft: T, options: SetDraftOptions = {}) => {
    _setDraft(newDraft)
    if (options.save) {
      setSaved(newDraft)
      setIsDrafting(false)
    } else {
      setIsDrafting(true)
    }
  }

  return [isDrafting, draft, setDraft, discardDraft]
}

export default useDraft