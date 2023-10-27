'use client'

import { DetailedHTMLProps, HTMLAttributes } from "react"
import PaginationContext, { PaginationProps } from "./context"

type DivProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

const PaginationControls = (
  { totalElements, pageSize, pageOffset, targetUrl, children, ...props }: PaginationProps & DivProps
) => {
  return <div {...props}>
    <PaginationContext.Provider value={{ totalElements, pageSize, pageOffset, targetUrl }}>
      {children}
    </PaginationContext.Provider>
  </div>
}

export default PaginationControls