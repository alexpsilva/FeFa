import { PaginationAction, PaginationState } from "@/hooks/usePagination";
import { createContext, Dispatch, useContext } from "react";

const PaginationContext = createContext<{ state: PaginationState, dispatch: Dispatch<PaginationAction> } | null>(null)

export function usePaginationContext() {
  const context = useContext(PaginationContext)
  if (!context) {
    throw new Error(
      "Pagination.* component must be a child of Pagination component"
    )
  }
  return context
}

export default PaginationContext