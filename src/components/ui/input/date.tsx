import stringifyDateISO from "@/utils/date/stringify-date-iso"
import React, { DetailedHTMLProps, InputHTMLAttributes } from "react"
import Input from "."

type InputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

interface Props {
  defaultValue?: Date,
}

const DateInput = ({
  defaultValue,
  ...props
}: Props & Omit<InputProps, 'defaultValue'>) => {
  return <Input
    type='date'
    defaultValue={defaultValue ? stringifyDateISO(defaultValue) : ''}
    {...props}
  />
}

export default DateInput