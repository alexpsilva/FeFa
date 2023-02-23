import React, { useEffect, useState } from "react"

import ColumnSpecification from "./types/column"
import InlineActionSpecification from "./types/inline-action"

import EditableTableHead from "./head"
import EditableTableBody from "./body"
import useDraft from "@/hooks/useDraft"
import BaseModel from "@/types/model/base"
import useLoadWhile from "@/hooks/useLoadWhile"
import updateArray from "@/utils/update-array"
import Button from "../button"
import useCreatingRow from "@/hooks/useCreatingRow"

interface Props<T> {
  columns: ColumnSpecification<T>[]
  listItems: () => Promise<T[]>
}

const EditableTable = <T extends BaseModel,>(
  { columns, listItems }: Props<T>
) => {
  const [isDrafting, data, setData, discardDraft] = useDraft<T[]>([])
  const [isLoading, setIsLoading] = useState<Boolean>(true)
  const [error, setError] = useState<Error>()
  const [deleting, setDeleting] = useState<T['id'][]>([])
  const [creating, setCreatingValue, discardCreating] = useCreatingRow<T>()

  const loadWhile = useLoadWhile(setError, setIsLoading)

  useEffect(() => {
    const fetchData = async () => loadWhile(listItems)
      .then((response: T[]) => setData(response, { save: true }))
    fetchData()
  }, [])

  if (isLoading) { return <h3>Loading...</h3> }
  if (error) { return <h3>Error: {error.message}</h3> }

  const onDataChange = (index: number, item: T, col: keyof T, newValue: any) => {
    setData(updateArray(
      data,
      i => i.id == item.id,
      { ...item, [col]: newValue }
    ))
  }

  const canSave = isDrafting || deleting.length || creating.length
  const onDataSave = () => {
    // setData(saveData())
    // discardCreating()
    // setDeleting([])
  }

  const onDataCancel = () => {
    discardDraft()
    discardCreating()
    setDeleting([])
  }

  const creatingColumns = [...columns] as ColumnSpecification<Partial<T>>[]
  const onCreatingChange = (index: number, item: Partial<T>, col: keyof T, newValue: any) => {
    setCreatingValue(index, col, newValue)
  }

  const inlineDelete: InlineActionSpecification<T> = {
    label: 'Delete',
    onClick: item => setDeleting([...deleting, item.id]),
    isEligible: item => !deleting.includes(item.id)
  }

  return (
    <>
      <table>
        <EditableTableHead columns={columns} />
        <EditableTableBody
          columns={columns}
          data={data}
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
        <Button text="Cancel" disabled={!canSave} onClick={onDataCancel} />
      </div>
    </>
  )
}

export default EditableTable