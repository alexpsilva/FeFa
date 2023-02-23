import React from "react"
import ColumnSpecification from "./types/column"

interface Props<T> {
  item: T
  column: ColumnSpecification<T>
  onChange: (item: T, col: keyof T, newValue: any) => void
}

const EditableTableCell = <T,>(
  { item, column, onChange }: Props<T>
) => {

  const value = item[column.key]
  const stringify = column.stringify ? column.stringify : String
  const stringValue = value == null ? '' : stringify(value)

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange(item, column.key, e.target.value)

  return (
    <td>
      {column.isEditable ?
        <input type="text" value={stringValue} onChange={onChangeHandler} />
        : <>{stringValue}</>
      }
    </td>
  )
}

export default EditableTableCell