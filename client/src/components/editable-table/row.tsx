import React from "react"

import ColumnSpecification from "./types/column"
import InlineActionSpecification from "./types/inline-action"

import EditableTableCell from "./cell"
import InlineAction from "./inline-action"

interface Props<T> {
  columns: ColumnSpecification<T>[]
  data: Partial<T>
  onChange: (col: ColumnSpecification<T>['key'], newValue: any) => void
  options?: {
    focus?: ColumnSpecification<T>['key']
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