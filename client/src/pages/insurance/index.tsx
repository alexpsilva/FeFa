import Insurance from "@/types/model/insurance"
import Head from "next/head"
import { NextPage } from "next/types"
import useDraft from "@/hooks/useDraft"
import Button from "@/components/ui/button"
import fetchAPIWithAuth from "@/utils/fetch-api-with-auth"
import Table from "@/components/layout/table/table"
import updateArray from "@/utils/update-array"
import useArray from "@/hooks/useArray"
import stringifyDate from "@/utils/stringify-date"


type Props = { insurances: Insurance[] }
const ListInsurances: NextPage<Props> = ({ insurances }) => {
  const [{ isDrafting, draft }, draftDispatch] = useDraft<Partial<Insurance>[]>(insurances)
  const [{ data: toDelete }, toDeleteDispatch] = useArray<Insurance['id']>()

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

  const onChangeHandler = (row: number, col: keyof Insurance, newValue: any) => {
    draftDispatch({
      type: "draft",
      payload: updateArray(
        draft,
        (_, i) => i == row,
        { ...draft[row], [col]: newValue }
      )
    })
  }

  const onAddHandler = () => {
    draftDispatch({
      type: "draft",
      payload: [...draft, {}]
    })
  }

  const onDeleteHandler = (row: number) => {
    if (row < insurances.length) {
      const payload = insurances[row].id
      toDeleteDispatch({ type: 'add', payload })
    }
    draftDispatch({
      type: "draft",
      payload: [...draft.slice(0, row), ...draft.slice(row + 1)]
    })
  }

  return (
    <>
      <Head>
        <title>Insurances</title>
      </Head>
      <h1>Insurances</h1>
      <Table
        columns={[
          { header: 'Nome', id: 'name', isEditable: true },
          { header: 'Atualizado em', id: 'updatedAt', format: stringifyDate },
          { header: 'Criado em', id: 'createdAt', format: stringifyDate },
        ]}
        data={draft}
        inlineActions={<Table.InlineButton text='Deletar' onClick={onDeleteHandler} />}
        footers={{ name: '+ Adicionar' }}
        onCell={{ change: onChangeHandler }}
        onFooter={{ click: onAddHandler }}
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
    insurances: data.sort((a: Insurance, b: Insurance) => a.id - b.id),
  }
}

export default ListInsurances