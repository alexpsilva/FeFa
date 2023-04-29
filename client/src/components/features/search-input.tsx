import { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, useEffect, useRef, useState } from "react"

type InputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
interface Props {
  onSearch: (term: string) => void
  hint?: string
}

interface State {
  term: string | null
  callback: NodeJS.Timeout | null
}

const SearchInput = ({ onSearch, hint, ...props }: Props & InputProps) => {
  const [state, setState] = useState<State>({ term: null, callback: null })

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const newTerm = e.target.value
    const interval = 800

    if (state.callback) { clearTimeout(state.callback) }

    setState({
      term: newTerm,
      callback: setTimeout(() => onSearch(newTerm), interval)
    })
  }

  return <input
    type='text'
    placeholder={hint}
    value={state.term || ''}
    onChange={onChangeHandler}
    {...props}
  />
}

export default SearchInput