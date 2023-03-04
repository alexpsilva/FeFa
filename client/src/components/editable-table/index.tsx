import React, { useState } from "react"

import ColumnSpecification from "./types/column"
import InlineActionSpecification from "./types/inline-action"

import EditableTableHeader from "./header"
import EditableTableRow from "./row"
import BaseModel from "@/types/model/base"
import updateArray from "@/utils/update-array"

interface Props<T extends BaseModel> {
  columns: ColumnSpecification<T>[]
  data: Partial<T>[]
  setData: (newData: Partial<T>[]) => void
  inlineActions?: InlineActionSpecification<T>[]
}

const EditableTable = <T extends BaseModel,>(
  { columns, data, setData, inlineActions }: Props<T>
) => {
  const [focus, setFocus] = useState<{ row: number, col: ColumnSpecification<T>['key'] } | undefined>()

  const onChangeHandler = (index: number, col: ColumnSpecification<T>['key'], newValue: any) => {
    const row = data[index]
    setData(updateArray(
      data,
      (_, i) => i == index,
      { ...row, [col]: newValue }
    ))
  }

  const onCreatingChangeHandler = (col: ColumnSpecification<T>['key'], newValue: any) => {
    const newRow = { [col]: newValue } as Partial<T>
    setData([...data, newRow])
    setFocus({ row: data.length, col: col })
  }

  return (
    <>
      <table>
        <thead>
          <EditableTableHeader columns={columns} />
        </thead>
        <tbody>
          {data.map((row, index) => (
            <EditableTableRow
              key={index}
              columns={columns}
              data={row}
              onChange={(col, newValue) => onChangeHandler(index, col, newValue)}
              options={{
                inlineActions: inlineActions,
                focus: focus?.row == index ? focus.col : undefined,
              }}
            />
          ))}
          <EditableTableRow
            columns={columns}
            data={{}}
            onChange={onCreatingChangeHandler}
          />
        </tbody>
      </table>
    </>
  )
}

export default EditableTable