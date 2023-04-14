import ColumnSpecification from "@/components/layout/table/column.type";
import TableRow from "@/components/layout/table/row";
import TableHeader from "./header";

interface Props<T> {
  data: T[]
  columns: ColumnSpecification<T>[]
  onClick?: (clicked: Partial<T>) => void
}

const SimpleTable = <T,>({ data, columns, onClick }: Props<T>) => {
  const readOnlyColumns = columns.map(column => ({ ...column, isEditable: false }))

  return (
    <table className="w-full text-center">
      <thead>
        <TableHeader columns={columns} />
      </thead>
      <tbody>
        {data.map((row, i) => (
          <TableRow
            key={i}
            data={row}
            columns={readOnlyColumns}
            onClick={onClick}
          />
        ))}
      </tbody>
    </table>
  )
}

export default SimpleTable