import { DetailedHTMLProps, HTMLAttributes } from "react"
import { usePaginationContext } from "./context"

type SpanProps = DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>

const CurrentPage = (props: SpanProps) => {
  const { state: { current, totalPages } } = usePaginationContext()

  return <span {...props}>{current.index} / {totalPages}</span>
}

export default CurrentPage