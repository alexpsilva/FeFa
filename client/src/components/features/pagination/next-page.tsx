import ArrowIcon from "@/components/icons/arrow"
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react"
import { usePaginationContext } from "./context"

type ButtonProps = Omit<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, 'onClick'>

interface Props {
  onClick: (offset: number) => void
}

const NextPage = ({ onClick, ...props }: Props & ButtonProps) => {
  const { state, dispatch } = usePaginationContext()

  const onClickHandler = () => {
    if (state.next) {
      onClick(state.next.offset)
      dispatch({ type: 'next' })
    }
  }

  return <button
    onClick={onClickHandler}
    disabled={!state.next}
    {...props}
  >
    <ArrowIcon
      width="18"
      height="18"
      direction="right"
    />
  </button>
}

export default NextPage