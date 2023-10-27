import stringifyDateISO from "@/utils/date/stringify-date-iso"
import Input from "@/components/ui/input"
import React, { DetailedHTMLProps, InputHTMLAttributes } from "react"

type InputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

interface Props {
  value: Date | undefined,
  onChange: (newValue: Date) => void
}

const DateInput = ({
  value,
  onChange,
  ...props
}: Props & Omit<InputProps, 'value' | 'onChange'>) => {
  const onChangeHandler = (newValue: string) => {
    const newDate = new Date(newValue)
    if (isNaN(newDate.getTime())) { return }

    onChange(newDate)
  }

  return <Input
    type='date'
    value={value ? stringifyDateISO(value) : ''}
    onChange={onChangeHandler}
    {...props}
  />
}

export default DateInput