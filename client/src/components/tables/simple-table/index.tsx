import SimpleColumnSpecification from "./column.type";
import SimpleTableRow from "./row";

interface Props<T> {
  data: T[]
  columns: SimpleColumnSpecification<T>[]
  onClick?: (clicked: T) => void
}

const SimpleTable = <T,>({ data, columns, onClick }: Props<T>) => {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((column, i) => (
            <th key={i}>{column.title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <SimpleTableRow
            key={i}
            data={row}
            columns={columns}
            onClick={onClick}
          />
        ))}
      </tbody>
    </table>
  )
}

export type { SimpleColumnSpecification }
export default SimpleTable