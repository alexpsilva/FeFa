'use client'

import { createContext, useContext } from "react";

interface PaginationProps {
  totalElements: number
  pageSize: number
  pageOffset: number
  targetUrl: (pageSize: number, pageOffset: number) => string
}

const PaginationContext = createContext<PaginationProps | null>(null)

export function usePaginationContext() {
  const context = useContext(PaginationContext)
  if (!context) {
    throw new Error(
      "Pagination.* component must be a child of Pagination component"
    )
  }
  return context
}

export type { PaginationProps }
export default PaginationContext