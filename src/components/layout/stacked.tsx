import { DetailedHTMLProps, HTMLAttributes } from "react"
import { twMerge } from "tailwind-merge"

type DivProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

const Stacked = ({ children, className, ...props }: DivProps) => {
  return <div className={twMerge("flex flex-col", className)} {...props}>
    {children}
  </div>
}

export default Stacked