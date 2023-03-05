import React, { useEffect, useRef } from "react"
import EditableColumnSpecification from "./column.type"

interface Props<T> {
  value: any
  column: EditableColumnSpecification<T>
  onChange: (newValue: any) => void
  focus?: boolean
}

const EditableTableCell = <T,>(
  { value, column, onChange, focus }: Props<T>
) => {
  const input = useRef<HTMLInputElement>(null)
  useEffect(() => { focus && input.current && input.current.focus() }, [])

  const stringify = column.stringify ? column.stringify : String
  const stringValue = value == null ? '' : stringify(value)

  return (
    <td>
      {column.isEditable ?
        <input
          type="text"
          value={stringValue}
          onChange={(e) => onChange(e.target.value)}
          ref={input} />
        : <>{stringValue}</>
      }
    </td>
  )
}

export default EditableTableCell