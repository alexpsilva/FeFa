import React from "react"
import RedirectRow from "./redirect-row"


interface Column<T> {
  header: string
  id: keyof T
  format?: (value: any) => string
}

interface Props<T> {
  columns: Column<T>[]
  data: T[]
  rowHref: (row: T) => string
  footer?: { [key in keyof T]?: React.ReactNode }
}

const RedirectTable = <T,>(
  { data, columns, rowHref, footer }: Props<T>
) => {
  const formatValue = (column: Column<T>, value: any) => column.format
    ? column.format(value)
    : value

  return (
    <table className="w-full border-slate-200 text-left text-skin-base ">
      <thead className="border-b-2">
        <tr>
          {columns.map((column, c_index) => (
            <th
              className="
                px-2 
                font-medium text-sm text-skin-muted leading-loose
                hover:bg-gray-100 hover:text-skin-selected"
              key={c_index}
            >
              {column.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, r_index) => (
          <RedirectRow
            className="hover:bg-gray-100 hover:text-skin-selected cursor-pointer"
            key={r_index}
            href={rowHref(row)}
          >
            {columns.map((column, c_key) => (
              <td
                className="px-2 py-1"
                key={c_key}
              >
                {formatValue(column, row[column.id])}
              </td>
            ))}
          </RedirectRow>
        ))}
      </tbody>
      {footer
        ? (
          <tfoot className="border-t-2 hover:bg-slate-100">
            <tr>
              {columns.map((column, c_index) => (
                <td
                  className=" 
                    px-2 
                    font-medium text-sm text-skin-muted leading-loose"
                  key={c_index}
                >
                  {footer ? footer[column.id] : null}
                </td>
              ))}
            </tr>
          </tfoot>
        )
        : null
      }

    </table>
  )
}

export default RedirectTable