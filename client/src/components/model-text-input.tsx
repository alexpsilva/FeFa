import Input from "./input"

interface Props<T> {
  model: any,
  field: keyof T
  setValue: (newModel: T) => void
}

const ModelTextInput = <T,>({ model, field, setValue }: Props<T>) => {
  return <Input
    value={String(model[field] ?? '')}
    setValue={(newValue) => setValue({ ...model, [field]: newValue })}
  />
}

export default ModelTextInput