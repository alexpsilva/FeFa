'use client'

import { ComponentProps, useState } from "react"
import applyMask from "./applyMask"
import Input from "./input"

type InputProps = ComponentProps<typeof Input>
type Props = Omit<InputProps, 'value' | 'onChange'>

const maskSlot = '*'
const phoneShortMask = "(**) ****-****"
const phoneLongMask = "(**) *****-****"

const PhoneInput = ({ children, ...props }: Props) => {
  const [value, setValue] = useState<string>('')
  const applyPhoneMask = (newValue: string) => applyMask(
    newValue.length <= 14 ? phoneShortMask : phoneLongMask,
    maskSlot,
    newValue,
    'numbers'
  )

  return <Input
    value={value}
    onChange={(e) => setValue(applyPhoneMask(e.target.value))}
    placeholder="(00) 00000-0000"
    {...props}
  >
    {children}
  </Input>
}

export default PhoneInput