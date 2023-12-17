import Link from "next/link"
import { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"
import ArrowIcon from "../icons/arrow"

type Props = ComponentProps<typeof Link>

const BackButton = ({ className, ...props }: Props) => {
  return <Link
    className={twMerge(
      `flex items-center gap-2
      text-sm font-bold text-skin-selected`,
      className
    )}
    {...props}
  >
    <ArrowIcon
      width="20"
      height="20"
      className="stroke-skin-selected"
      direction="left"
    />Voltar
  </Link>
}

export default BackButton