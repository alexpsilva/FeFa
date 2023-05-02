import ArrowIcon from "@/components/icons/arrow"
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react"
import { usePaginationContext } from "./context"

type ButtonProps = Omit<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, 'onClick'>

interface Props {
  onClick: (offset: number) => void
}

const PreviousPage = ({ onClick, ...props }: Props & ButtonProps) => {
  const { state, dispatch } = usePaginationContext()

  const onClickHandler = () => {
    if (state.previous) {
      onClick(state.previous.offset)
      dispatch({ type: 'previous' })
    }
  }

  return <button
    onClick={onClickHandler}
    disabled={!state.previous}
    {...props}
  >
    <ArrowIcon
      width="18"
      height="18"
      direction="left"
    />
  </button>
}

export default PreviousPage