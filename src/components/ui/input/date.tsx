import stringifyDateISO from "@/utils/date/stringify-date-iso"
import React, { DetailedHTMLProps, InputHTMLAttributes } from "react"
import Input from "."

type InputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type Props = {
  value?: Date,
  defaultValue?: Date,
} & Omit<InputProps, 'defaultValue' | 'value'>

const DateInput = ({
  defaultValue,
  value,
  ...props
}: Props) => {
  const args: { value?: string, defaultValue?: string } = {}
  if (value) { args.value = stringifyDateISO(value) }
  if (defaultValue) { args.defaultValue = stringifyDateISO(defaultValue) }

  return <Input
    type='date'
    {...args}
    {...props}
  />
}

export default DateInput