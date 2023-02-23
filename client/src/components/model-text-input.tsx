import React from "react"

interface Props<Type extends object> {
  value: Type
  field: Extract<keyof Type, string>
  setValue: (state: Type) => void
}

const ModelTextInput = <Type extends object,>({ value: model, field, setValue: setState }: Props<Type>) => {
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...model,
      [field]: e.target.value
    })
  }

  return <input
    type="text"
    value={String(model[field] ?? '')}
    onChange={onChangeHandler}
  />
}

export default ModelTextInput