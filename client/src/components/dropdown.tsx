interface Props {
  value: any,
  setValue: (newValue: string) => void
  options: { label: string, value: string }[]
}

const Dropdown = ({ value, setValue, options }: Props) => {
  return <select value={value} onChange={(e) => setValue(e.target.value)}>
    {options.map((option, i) => (
      <option key={i} value={option.value}>{option.label}</option>
    ))}
  </select>
}

export default Dropdown