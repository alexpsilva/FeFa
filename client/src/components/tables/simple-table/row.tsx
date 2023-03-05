import SimpleColumnSpecification from "./column.type"

interface Props<T> {
  data: T
  columns: SimpleColumnSpecification<T>[]
  onClick?: (clicked: T) => void
}

const SimpleTableRow = <T,>({ data, columns, onClick }: Props<T>) => {
  const _onClick = onClick ? () => onClick(data) : () => { }

  return <tr onClick={_onClick}>
    {columns.map((column, i) => {
      const value = data[column.key]
      const stringValue = column.stringify ? column.stringify(value) : String(value)

      return <td key={i}>{stringValue}</td>
    })}
  </tr>
}

export default SimpleTableRow