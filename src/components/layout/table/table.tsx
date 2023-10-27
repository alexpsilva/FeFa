"use client"

import React, { createContext, useContext } from "react"
import InlineButton from "./inline-button"
import Input from "@/components/ui/input"
import InlineIcon from "./inline-icon"

type TableContextType =
  | { type: 'row', row: number }
// | { type: 'header', column: string }
// | { type: 'cell', row: number, column: string }

const TableContext = createContext<TableContextType | null>(null)
const useTableContext = () => {
  const context = useContext(TableContext)
  if (context === null) {
    throw new Error('TableContext must only be used inside a Table component')
  }

  return context
}

interface Column<T> {
  header: string
  id: keyof T
  isEditable?: boolean
  format?: (value: any) => string
}

interface Props<T> {
  columns: Column<T>[]
  data: T[]
  onCell?: {
    change?: (row: number, column: keyof T, newValue: any) => void,
    click?: (row: number, column: keyof T) => void,
  }
  onRow?: {
    click: (row: number) => void
  }
  onHeader?: {
    click: (column: keyof T) => void
  }
  onFooter?: {
    click: () => void
  }
  showHeaders?: boolean
  footer?: { [key in keyof T]?: React.ReactNode }
  inlineActions?: React.ReactNode | React.ReactNode[]
}

const Table = <T,>(
  { data, columns, onCell, onRow, onHeader, onFooter, showHeaders, footer, inlineActions }: Props<T>
) => {
  const formatValue = (column: Column<T>, value: any) => column.format
    ? column.format(value)
    : value

  const inlineActionsArray = inlineActions
    ? inlineActions instanceof Array
      ? inlineActions
      : [inlineActions]
    : []

  const eventHandlers = {
    headerClick: onHeader?.click ? onHeader.click : () => { },
    rowClick: onRow?.click ? onRow.click : () => { },
    cellClick: onCell?.click ? onCell.click : () => { },
    cellChange: onCell?.change ? onCell.change : () => { },
    footerClick: onFooter?.click ? onFooter.click : () => { },
  }

  return (
    <table className="w-full border-slate-200 text-left text-skin-base ">
      {showHeaders === false
        ? null
        : (
          <thead className="border-b-2">
            <tr>
              {columns.map((column, c_index) => (
                <th
                  className="
                    px-2 
                    font-medium text-sm text-skin-muted leading-loose
                    hover:bg-gray-100 hover:text-skin-selected"
                  key={c_index}
                  onClick={() => eventHandlers.headerClick(column.id)}
                >
                  {column.header}
                </th>
              ))}
              {inlineActionsArray.map((inlineAction, ia_index) => (
                <th key={ia_index}></th>
              ))}
            </tr>
          </thead>
        )
      }
      <tbody>
        {data.map((row, r_index) => (
          <tr
            className={
              `hover:bg-gray-100 hover:text-skin-selected
              ${!!onRow ? 'cursor-pointer' : ''}`
            }
            key={r_index}
            onClick={() => eventHandlers?.rowClick(r_index)}
          >
            <TableContext.Provider value={{ type: 'row', row: r_index }}>
              {columns.map((column, c_key) => (
                <td
                  className="px-2 py-1"
                  key={c_key}
                  onClick={() => eventHandlers.cellClick(r_index, column.id)}
                >
                  {column.isEditable
                    ? <Input
                      className="w-full"
                      value={formatValue(column, row[column.id])}
                      onChange={(newValue) => eventHandlers.cellChange(r_index, column.id, newValue)}
                    />
                    : <>{formatValue(column, row[column.id])}</>
                  }
                </td>
              ))}
              {inlineActionsArray.map((inlineAction, ia_index) => (
                <td
                  className="px-2 py-1"
                  key={ia_index}
                >
                  {inlineAction}
                </td>
              ))}
            </TableContext.Provider>
          </tr>
        ))}
      </tbody>
      {footer
        ? (
          <tfoot className="border-t-2 hover:bg-slate-100">
            <tr onClick={eventHandlers.footerClick}>
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

Table.InlineButton = InlineButton
Table.InlineIcon = InlineIcon

export { useTableContext }
export default Table