'use client'

import { FormEvent } from "react"
import SearchIcon from "../../icons/search"
import SearchInputSubmit from "./search-submit"

interface Props {
  onSearch: (term: string) => void
  defaultValue?: string
  placeholder?: string
}

const SearchInput = ({ onSearch, defaultValue, placeholder }: Props) => {
  const onSearchAction = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.target as HTMLFormElement)
    const searchTerm = formData.get('searchTerm')
    onSearch(searchTerm ? String(searchTerm) : '')
  }

  return <form className="
    flex gap-1
    items-center justify-center 
    max-w-md 
    rounded-lg bg-gray-200"
    onSubmit={onSearchAction}
  >
    <input
      className="flex-grow bg-transparent focus:outline-none"
      type='text'
      name='searchTerm'
      defaultValue={defaultValue}
      placeholder={placeholder ?? ''}
    />
    <SearchInputSubmit>
      <SearchIcon
        className="stroke-skin-base"
        width="22"
        height="22"
      />
    </SearchInputSubmit>
  </form>
}

export default SearchInput