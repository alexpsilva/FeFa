import { InputHTMLAttributes } from "react"

interface Props {
  value: any,
  setValue: (newValue: string) => void
  type?: InputHTMLAttributes<HTMLInputElement>['type']
}

const Input = ({ value, setValue, type }: Props) => {
  return <input
    type={type || 'text'}
    value={String(value ?? '')}
    onChange={(e) => setValue(e.target.value)}
  />
}

export default Input