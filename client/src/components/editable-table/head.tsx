import React from "react"

import ColumnSpecification from "./types/column"

interface Props<T> {
  columns: ColumnSpecification<T>[]
}

const EditableTableHead = <T,>(
  { columns }: Props<T>
) => {
  return (
    <thead>
      <tr>
        {columns.map((column, i) => (
          <th key={i}>{column.title}</th>
        ))}
      </tr>
    </thead>
  )
}

export default EditableTableHead