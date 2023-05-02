import usePagination, { PaginationAction, PaginationState } from "@/hooks/usePagination"
import { DetailedHTMLProps, Dispatch, HTMLAttributes } from "react"
import PaginationContext from "./context"
import CurrentPage from "./current-page"
import NextPage from "./next-page"
import PreviousPage from "./previous-page"

type DivProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
interface Props {
  state: PaginationState
  dispatch: Dispatch<PaginationAction>
}

const PaginationControls = (
  { state, dispatch, children, ...props }: Props & DivProps
) => {
  return <div {...props}>
    <PaginationContext.Provider value={{ state, dispatch }}>
      {children}
    </PaginationContext.Provider>
  </div>
}

PaginationControls.CurrentPage = CurrentPage
PaginationControls.NextPage = NextPage
PaginationControls.PreviousPage = PreviousPage

export default PaginationControls