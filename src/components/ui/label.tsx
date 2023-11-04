import { DetailedHTMLProps, LabelHTMLAttributes } from "react"
import { twMerge } from "tailwind-merge"

type LabelProps = DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>

const Label = ({ children, className, ...props }: LabelProps) => {
  return <label
    className={twMerge("text-sm", className)}
    {...props}
  >
    {children}
  </label>
}

export default Label