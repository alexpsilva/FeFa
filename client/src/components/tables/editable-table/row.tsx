import React from "react"

import EditableTableCell from "./cell"
import InlineAction, { InlineActionSpecification } from "../inline-action"
import EditableColumnSpecification from "./column.type"

interface Props<T> {
  columns: EditableColumnSpecification<T>[]
  data: Partial<T>
  onChange: (col: EditableColumnSpecification<T>['key'], newValue: any) => void
  options?: {
    focus?: EditableColumnSpecification<T>['key']
    inlineActions?: InlineActionSpecification<T>[]
  }
}

const EditableTableRow = <T,>(
  { columns, options, data, onChange }: Props<T>
) => {
  return (
    <tr>
      {columns.map((col, j) => (
        <EditableTableCell
          key={j}
          value={data[col.key]}
          column={col}
          onChange={(newValue) => onChange(col.key, newValue)}
          focus={options?.focus == col.key}
        />
      ))}
      <td>
        {options?.inlineActions?.map((action, index) =>
          <InlineAction
            key={index}
            row={data}
            action={action}
          />
        )}
      </td>
    </tr>
  )
}

export default EditableTableRow