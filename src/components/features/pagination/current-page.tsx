'use client'

import { DetailedHTMLProps, HTMLAttributes } from "react"
import { usePaginationContext } from "./context"

type SpanProps = DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>

const CurrentPage = (props: SpanProps) => {
  const { totalElements, pageSize, pageOffset } = usePaginationContext()
  const totalPages = Math.ceil(totalElements / pageSize)
  const currentPage = (Math.floor(pageOffset / pageSize)) + 1

  return <span {...props}>{currentPage} / {totalPages}</span>
}

export default CurrentPage