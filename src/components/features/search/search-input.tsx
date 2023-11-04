'use client'

import { DetailedHTMLProps, FormEvent, FormHTMLAttributes } from "react"
import { twMerge } from "tailwind-merge"
import SearchIcon from "../../icons/search"
import SearchInputSubmit from "./search-submit"

type FormProps = Omit<DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>, 'onSubmit'>
type Props = {
  onSearch: (term: string) => void
  defaultValue?: string
  placeholder?: string
} & FormProps

const SearchInput = ({ onSearch, defaultValue, placeholder, className, ...props }: Props) => {
  const onSearchAction = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.target as HTMLFormElement)
    const searchTerm = formData.get('searchTerm')
    onSearch(searchTerm ? String(searchTerm) : '')
  }

  return <form className={twMerge(
    'flex gap-1 items-center justify-center',
    className
  )}
    onSubmit={onSearchAction}
    {...props}
  >
    <SearchInputSubmit className="p-2">
      <SearchIcon
        width="22"
        height="22"
      />
    </SearchInputSubmit>
    <input
      className="flex-grow bg-transparent focus:outline-none"
      type='text'
      name='searchTerm'
      defaultValue={defaultValue}
      placeholder={placeholder ?? ''}
    />
  </form>
}

export default SearchInput