import Insurance from "@/types/model/insurance"
import stringifyDate from "@/utils/stringify-date"
import Head from "next/head"
import { NextPage } from "next/types"
import useDraft from "@/hooks/useDraft"
import Button from "@/components/ui/button"
import useInlineDelayedDelete from "@/hooks/useInlineDelayedDelete"
import fetchAPIWithAuth from "@/utils/fetch-api-with-auth"
import ColumnSpecification from "@/components/layout/table/column.type"
import EditableTable from "@/components/layout/table/editable-table"

const insuranceFields: ColumnSpecification<Insurance>[] = [
  { title: 'Id', key: 'id' },
  { title: 'Name', key: 'name', isEditable: true },
  { title: 'Updated', key: 'updatedAt', stringify: stringifyDate },
  { title: 'Created', key: 'createdAt', stringify: stringifyDate },
]

type Props = { data: Insurance[] }
const ListInsurances: NextPage<Props> = ({ data }) => {
  const [{ isDrafting, draft }, draftDispatch] = useDraft<Partial<Insurance>[]>(data)
  const [toDelete, toDeleteDispatch, inlineDelete] = useInlineDelayedDelete<Insurance>()

  if (!draft) { return <h3>Loading...</h3> }

  const toCreate = draft.filter(i => !i.id)
  const toUpdate = draft.filter(i => i.id && !toDelete.includes(i.id))
  const canSave = isDrafting || toDelete.length

  const onSaveHandler = async () => {
    const { data } = await fetchAPIWithAuth('/insurances/batch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ create: toCreate, update: toUpdate, delete: toDelete }),
    })

    const sorted = data.sort((a: Insurance, b: Insurance) => a.id - b.id)

    draftDispatch({ type: 'save', payload: sorted })
    toDeleteDispatch({ type: 'clear' })
  }

  const onCancelHandler = () => {
    draftDispatch({ type: 'discard' })
    toDeleteDispatch({ type: 'clear' })
  }

  return (
    <>
      <Head>
        <title>Insurances</title>
      </Head>
      <h1>Insurances</h1>
      <EditableTable
        columns={insuranceFields}
        data={draft}
        setData={(newDraft) => draftDispatch({ type: 'draft', payload: newDraft })}
        inlineActions={[inlineDelete]}
      />
      <div>
        <Button text="Save" disabled={!canSave} onClick={onSaveHandler} />
        <Button text="Cancel" disabled={!canSave} onClick={onCancelHandler} />
      </div>
    </>
  )
}

ListInsurances.getInitialProps = async (ctx) => {
  const { data, error } = await fetchAPIWithAuth('/insurances', { method: 'GET' }, ctx)

  if (error) { throw new Error(error.message) }
  return {
    data: data.sort((a: Insurance, b: Insurance) => a.id - b.id),
  }
}

export default ListInsurances