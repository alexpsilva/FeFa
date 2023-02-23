import React from "react"

import ColumnSpecification from "./types/column"
import InlineActionSpecification from "./types/inline-action"

import EditableTableCell from "./cell"
import InlineAction from "./inline-action"

interface Props<T> {
  columns: ColumnSpecification<T>[]
  data: T[]
  onDataChange: (index: number, item: T, col: keyof T, newValue: any) => void
  options?: {
    inlineActions?: InlineActionSpecification<T>[]
  }
}

const EditableTableBody = <T,>(
  { columns, options, data, onDataChange }: Props<T>
) => {
  const onDataChangeHandler = (index: number) => (item: T, col: keyof T, newValue: any) =>
    onDataChange(index, item, col, newValue)

  return (
    <tbody>
      {data.map((item, i) => (
        <tr key={i}>
          {columns.map((col, j) => (
            <EditableTableCell
              key={j}
              item={item}
              column={col}
              onChange={onDataChangeHandler(i)}
            />
          ))}
          <td>
            {options?.inlineActions?.map((action, index) =>
              <InlineAction
                key={index}
                item={item}
                action={action}
              />
            )}
          </td>
        </tr>
      ))}
    </tbody>
  )
}

export default EditableTableBody