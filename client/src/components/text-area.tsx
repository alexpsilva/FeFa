interface Props {
  value: any,
  setValue: (newValue: any) => void
}

const TextArea = ({ value, setValue }: Props) => {
  return <textarea
    value={String(value ?? '')}
    onChange={(e) => setValue(e.target.value)}
  />
}

export default TextArea