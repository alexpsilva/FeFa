import { DetailedHTMLProps, SelectHTMLAttributes } from "react"

type SelectProps = DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>
type Props<T extends SelectProps['value']> = {
  options: { label: string, value: T }[]
}

const Dropdown = <T extends SelectProps['value'],>({
  options,
  ...props
}: Props<T> & SelectProps) => {
  return <select {...props}>
    {options.map((option, i) => (
      <option key={i} value={option.value}>{option.label}</option>
    ))}
  </select>
}

export default Dropdown