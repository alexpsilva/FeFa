import { DEBOUNCER_TOLERANCE_MILLISECONDS } from "@/constants"
import { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, useState } from "react"
import Input from "../ui/input"

type InputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
interface Props {
  term: string
  setTerm: (term: string) => void
  onSearch: (term: string) => void
  hint?: string
}

interface State {
  callback: NodeJS.Timeout | null
}

const SearchInput = (
  { term, setTerm, onSearch, hint, ...props }: Props & InputProps
) => {
  const [state, setState] = useState<State>({ callback: null })

  const onChangeHandler = (newTerm: string) => {
    const interval = DEBOUNCER_TOLERANCE_MILLISECONDS

    if (state.callback) { clearTimeout(state.callback) }

    setTerm(newTerm)
    setState({ callback: setTimeout(() => onSearch(newTerm), interval) })
  }

  return <Input
    value={term}
    onChange={onChangeHandler}
    placeholder={hint ?? ''}
    {...props}
  />
}

export default SearchInput