import stringifyDateISO from "@/utils/stringify-date-iso"
import Input from "./input"

interface Props<T> {
  model: any,
  field: keyof T
  setValue: (newModel: T) => void
}

const ModelDateInput = <T,>({ model, field, setValue }: Props<T>) => {
  return <Input
    type='date'
    value={stringifyDateISO(model[field] ?? '')}
    setValue={(newValue) => setValue({ ...model, [field]: newValue })}
  />
}

export default ModelDateInput