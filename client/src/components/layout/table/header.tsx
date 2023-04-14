import React from "react"
import ColumnSpecification from "./column.type"

interface Props<T> { columns: ColumnSpecification<T>[] }

const TableHeader = <T,>({ columns }: Props<T>) => {
  return (
    <tr className="bg-gray-700 text-cyan-500">
      {columns.map((column, i) => (
        <th key={i}>{column.title}</th>
      ))}
    </tr>
  )
}

export default TableHeader