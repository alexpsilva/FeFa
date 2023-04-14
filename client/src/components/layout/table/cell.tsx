import React, { useEffect, useRef } from "react"
import Input from "@/components/ui/input"

interface ReadOnlyProps<T> {
  value: string
  isEditable: false
}

interface EditableProps<T> {
  value: string
  isEditable: true
  onChange: (newValue: string) => void
  isFocused?: boolean
}

const TableCell = <T,>(props: ReadOnlyProps<T> | EditableProps<T>) => {
  const { value, isEditable } = props

  return (
    <td>
      <div className="px-2 py-1">
        {isEditable ?
          <Input
            value={value}
            onChange={props.onChange}
            isFocused={props.isFocused}
          />
          : <>{value}</>
        }
      </div>
    </td>
  )
}

export default TableCell