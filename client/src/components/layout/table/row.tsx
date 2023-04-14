import React from "react"

import InlineAction, { InlineActionSpecification } from "./inline-action"
import ColumnSpecification from "./column.type"
import TableCell from "./cell"

interface Props<T> {
  columns: ColumnSpecification<T>[]
  data: Partial<T>
  onClick?: (clicked: Partial<T>) => void
  onCellChange?: (column: keyof T, newValue: any) => void
  options?: {
    focus?: ColumnSpecification<T>['key']
    inlineActions?: InlineActionSpecification<T>[]
  }
}

const TableRow = <T,>({ columns, options, data, onClick, onCellChange }: Props<T>) => {
  const _onClick = onClick ? () => onClick(data) : () => { }

  return (
    <tr onClick={_onClick} className="hover:bg-gray-100">
      {columns.map((column, i) => {
        const value = data[column.key]
        const stringify = column.stringify ? column.stringify : String
        const stringValue = value == null ? '' : stringify(value)

        if (column.isEditable && onCellChange) {
          return <TableCell
            key={i} value={stringValue} isEditable={true}
            onChange={(newValue) => onCellChange(column.key, newValue)}
            isFocused={column.key === options?.focus}
          />
        }
        else {
          return <TableCell key={i} value={stringValue} isEditable={false} />
        }
      })}
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

export default TableRow