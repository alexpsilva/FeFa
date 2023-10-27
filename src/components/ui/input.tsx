import { DetailedHTMLProps, InputHTMLAttributes, useEffect, useRef } from "react"

type InputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

interface Props<T> {
  value: T,
  onChange: (newValue: string) => void
  type?: InputProps['type']
  isFocused?: boolean
}

const Input = <T extends InputProps['value'],>({
  value,
  onChange,
  type,
  isFocused,
  ...props
}: Props<T> & Omit<InputProps, 'value' | 'onChange' | 'type'>) => {
  const ref = useRef<HTMLInputElement>(null)
  useEffect(() => { isFocused && ref.current?.focus() }, [isFocused])

  return <input
    className="enabled:bg-transparent"
    type={type || 'text'}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    ref={ref}
    {...props}
  />
}

export default Input