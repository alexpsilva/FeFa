import TextArea from "@/components/ui/text-area"

interface Props<T> {
  model: any,
  field: keyof T
  setValue: (newModel: T) => void
}

const ModelTextArea = <T,>({ model, field, setValue }: Props<T>) => {
  return <TextArea
    value={String(model[field] ?? '')}
    setValue={(newValue) => setValue({ ...model, [field]: newValue })}
  />
}

export default ModelTextArea