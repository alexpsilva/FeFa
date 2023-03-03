import React, { useState } from "react"

import ColumnSpecification from "./types/column"
import InlineActionSpecification from "./types/inline-action"

import EditableTableHead from "./head"
import EditableTableBody from "./body"
import useDraft from "@/hooks/useDraft"
import BaseModel from "@/types/model/base"
import updateArray from "@/utils/update-array"
import Button from "../button"
import useCreatingRow from "@/hooks/useCreatingRow"

interface Props<T extends BaseModel> {
  columns: ColumnSpecification<T>[]
  initialData: T[]
  onSave: (creating: Partial<T>[], deleting: T['id'][], updating: T[]) => Promise<T[]>
}

const EditableTable = <T extends BaseModel,>(
  { columns, initialData, onSave }: Props<T>
) => {
  const [isDrafting, data, setData, discardDraft] = useDraft<T[]>(initialData)
  const [updating, setUpdating] = useState<Set<T['id']>>(new Set())
  const [deleting, setDeleting] = useState<Set<T['id']>>(new Set())
  const [creating, setCreatingValue, discardCreating] = useCreatingRow<T>()

  const discardAll = () => {
    discardDraft()
    discardCreating()
    setUpdating(new Set())
    setDeleting(new Set())
  }

  const onDataChange = (index: number, item: T, col: keyof T, newValue: any) => {
    setUpdating(_updating => new Set(_updating).add(item.id))
    setData(updateArray(
      data,
      i => i.id == item.id,
      { ...item, [col]: newValue }
    ))
  }

  const canSave = isDrafting || deleting.size || creating.length
  const onDataSave = async () => {
    const newData = await onSave(
      creating.slice(0, -1),
      [...deleting],
      data.filter(i => updating.has(i.id)),
    )

    discardAll()
    setData(newData, { save: true })
  }

  const creatingColumns = [...columns] as ColumnSpecification<Partial<T>>[]
  const onCreatingChange = (index: number, item: Partial<T>, col: keyof T, newValue: any) => {
    setCreatingValue(index, col, newValue)
  }

  const inlineDelete: InlineActionSpecification<T> = {
    label: 'Delete',
    onClick: item => setDeleting(_deleting => new Set(_deleting).add(item.id)),
    isEligible: item => !deleting.has(item.id)
  }

  return (
    <>
      <table>
        <EditableTableHead columns={columns} />
        <EditableTableBody
          columns={columns}
          data={data.sort((a, b) => Number(a.id) - Number(b.id))}
          onDataChange={onDataChange}
          options={{ inlineActions: [inlineDelete] }}
        />
        <EditableTableBody
          columns={creatingColumns}
          data={creating}
          onDataChange={onCreatingChange}
        />
      </table>
      <div>
        <Button text="Save" disabled={!canSave} onClick={onDataSave} />
        <Button text="Cancel" disabled={!canSave} onClick={discardAll} />
      </div>
    </>
  )
}

export default EditableTable