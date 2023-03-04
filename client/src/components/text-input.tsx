interface Props {
  value: any,
  setValue: (newValue: any) => void
}

const TextInput = ({ value, setValue }: Props) => {
  return <input
    type="text"
    value={String(value ?? '')}
    onChange={(e) => setValue(e.target.value)}
  />
}

export default TextInput