import { DetailedHTMLProps, InputHTMLAttributes, useEffect, useRef } from "react"

type InputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
interface Props {
  value: any,
  onChange: (newValue: any) => void
  type?: InputHTMLAttributes<HTMLInputElement>['type']
  isFocused?: boolean
}

const Input = ({ value, onChange, type, isFocused, ...props }: Props & InputProps) => {
  const ref = useRef<HTMLInputElement>(null)
  useEffect(() => { isFocused && ref.current?.focus() }, [isFocused])

  return <input
    className="enabled:bg-transparent"
    type={type || 'text'}
    value={String(value ?? '')}
    onChange={(e) => onChange(e.target.value)}
    ref={ref}
    {...props}
  />
}

export default Input