'use client'

import PaginationControls from "@/components/features/pagination"
import { ComponentProps } from "react"

type Props = { pacientId: number } & Omit<
  ComponentProps<typeof PaginationControls>,
  'targetUrl'
>

const AppointmentPaginationControls = ({ pacientId, ...props }: Props) => {
  const targetUrl = (newPageSize: number, newPageOffset: number) => {
    let url = `/pacient/${pacientId}?`
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

export default AppointmentPaginationControls