import stringifyDateISO from "@/utils/date/stringify-date-iso"
import Input from "@/components/ui/input"

interface Props<T> {
  model: any,
  field: keyof T
  setValue: (newModel: T) => void
}

const ModelDateInput = <T,>({ model, field, setValue }: Props<T>) => {
  const onChangeHandler = (newValue: string) => {
    const newDate = new Date(newValue)
    if (isNaN(newDate)) { return }

    setValue({ ...model, [field]: newDate })
  }

  return <Input
    type='date'
    value={model[field] ? stringifyDateISO(model[field]) : ''}
    onChange={onChangeHandler}
  />
}

export default ModelDateInput