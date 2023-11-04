'use client'

import PaginationControls from "@/components/features/pagination"
import { ComponentProps } from "react"

type Props = Omit<ComponentProps<typeof PaginationControls>, 'targetUrl'>

const AppointmentPaginationControls = (props: Props) => {
  const targetUrl = (pageSize: number, pageOffset: number) => {
    return `/pacient?pageSize=${pageSize}&pageOffset=${pageOffset}`
  }

  return (
    <PaginationControls
      targetUrl={targetUrl}
      {...props}
    />
  )
}

export default AppointmentPaginationControls