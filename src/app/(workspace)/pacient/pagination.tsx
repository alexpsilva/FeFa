'use client'

import PaginationControls from "@/components/features/pagination"
import { ComponentProps } from "react"

type Props = { term: string } & Omit<
  ComponentProps<typeof PaginationControls>,
  'targetUrl'
>

const PacientPaginationControls = ({ term, ...props }: Props) => {
  const targetUrl = (newPageSize: number, newPageOffset: number) => {
    let url = '/pacient'

    if (term) { url = `${url}?term=${term}&` }
    else { url = `${url}?` }

    url = `${url}pageSize=${newPageSize}&pageOffset=${newPageOffset}`

    return url
  }

  return (
    <PaginationControls
      targetUrl={targetUrl}
      {...props}
    />
  )
}

export default PacientPaginationControls