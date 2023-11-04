'use client'

import SearchInput from "@/components/features/search/search-input"
import { useRouter } from "next/navigation"
import { ComponentProps } from "react"


const SearchPacient = (props: Omit<ComponentProps<typeof SearchInput>, 'onSearch'>) => {
  const router = useRouter()

  return (
    <SearchInput
      onSearch={(newTerm) => router.push(`/pacient?term=${newTerm}`)}
      {...props}
    />
  )
}

export default SearchPacient