import React from "react"

import ColumnSpecification from "./types/column"

interface Props<T> {
  columns: ColumnSpecification<T>[]
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