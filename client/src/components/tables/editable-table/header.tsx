import React from "react"
import EditableColumnSpecification from "./column.type"

interface Props<T> {
  columns: EditableColumnSpecification<T>[]
}

const EditableTableHeader = <T,>(
  { columns }: Props<T>
) => {
  return (
    <tr>
      {columns.map((column, i) => (
        <th key={i}>{column.title}</th>
      ))}
    </tr>
  )
}

export default EditableTableHeader