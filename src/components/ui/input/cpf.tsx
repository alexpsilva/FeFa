'use client'

import { ComponentProps, useState } from "react"
import applyMask from "./applyMask"
import Input from "./input"

type InputProps = ComponentProps<typeof Input>
type Props = Omit<InputProps, 'value' | 'onChange'>

const maskSlot = '*'
const cpfMask = "***.***.***-**"

const CpfInput = ({ children, defaultValue, ...props }: Props) => {
  const [value, setValue] = useState<string>('')
  const applyCpfMask = (newValue: string) => applyMask(cpfMask, maskSlot, newValue, 'numbers')

  return <Input
    value={value ?? defaultValue}
    onChange={(e) => setValue(applyCpfMask(e.target.value))}
    placeholder="000.000.000-00"
    {...props}
  >
    {children}
  </Input>
}

export default CpfInput