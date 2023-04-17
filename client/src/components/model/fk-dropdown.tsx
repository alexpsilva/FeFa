import Dropdown from "@/components/ui/dropdown"

interface Props<T> {
  model: T,
  field: keyof T
  setValue: (newModel: T) => void
  options: { label: string, id: number }[]
}

const ModelFKDropdown = <T,>({ model, field, setValue, options }: Props<T>) => {
  return <Dropdown
    value={model[field]}
    setValue={(newValue) => setValue({ ...model, [field]: Number(newValue) })}
    options={options.map(option => ({ label: option.label, value: String(option.id) }))}
  />
}

export default ModelFKDropdown