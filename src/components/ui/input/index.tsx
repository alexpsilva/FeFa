import { DetailedHTMLProps, InputHTMLAttributes } from "react"
import { twMerge } from "tailwind-merge"

type InputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type Props = {
  type?: InputProps['type']
} & Omit<InputProps, 'type'>

const Input = ({ type, className, ...props }: Props) => {
  return <input
    className={twMerge(
      `text-lg 
      autofill:bg-transparent outline-none 
      border-b-2 border-b-skin-base
      focus:border-b-skin-selected
      read-only:border-b-0
      `,
      className,
    )}
    type={type || 'text'}
    {...props}
  />
}

export default Input