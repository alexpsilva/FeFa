import { DetailedHTMLProps, forwardRef, InputHTMLAttributes } from "react"
import { twMerge } from "tailwind-merge"

type InputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type Props = {
  type?: InputProps['type']
} & Omit<InputProps, 'type'>

const Input = forwardRef<HTMLInputElement, Props>(({ type, className, ...props }: Props, ref) => {
  return <input
    ref={ref}
    className={twMerge(
      `text-lg border-b-2 border-b-skin-base
      autofill:bg-transparent outline-none 
      focus:border-b-skin-selected
      read-only:border-b-0
      `,
      className,
    )}
    type={type || 'text'}
    {...props}
  />
})

export default Input