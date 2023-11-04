'use client'

import PaginationControls from "@/components/features/pagination"
import { ComponentProps } from "react"

type Props = { term: string } & Omit<
  ComponentProps<typeof PaginationControls>,
  'targetUrl'
>

const PacientPaginationControls = (props: Props) => {
  const targetUrl = (newPageSize: number, newPageOffset: number) => {
    let url = '/pacient'

    if (props.term) { url = `${url}?term=${props.term}&` }
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