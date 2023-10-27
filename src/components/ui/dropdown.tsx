import { ChangeEvent, DetailedHTMLProps, SelectHTMLAttributes } from "react"

type SelectProps = DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>


interface Props<T> {
  value: T,
  setValue: (newValue: string) => void
  options: { label: string, value: T }[]
}

const Dropdown = <T extends SelectProps['value'],>({
  value,
  setValue,
  options,
  ...props
}: Props<T> & Omit<SelectProps, 'value' | 'onChange'>) => {
  const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value)
  }

  return <select value={value} onChange={onChangeHandler} {...props}>
    {options.map((option, i) => (
      <option key={i} value={option.value}>{option.label}</option>
    ))}
  </select>
}

export default Dropdown