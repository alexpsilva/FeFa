import Insurance from "@/types/model/insurance"
import Head from "next/head"
import { NextPage } from "next/types"
import useDraft from "@/hooks/useDraft"
import Button from "@/components/ui/button"
import fetchAPIWithAuth from "@/auth/fetch-api-with-auth"
import Table from "@/components/layout/table/table"
import updateArray from "@/utils/update-array"
import useArray from "@/hooks/useArray"
import stringifyDate from "@/utils/date/stringify-date"
import Trash from "@/components/icons/trash"
import useNotify from "@/components/features/notification/context"


type Props = { insurances: Insurance[] }
const ListInsurances: NextPage<Props> = ({ insurances }) => {
  const notify = useNotify()
  const [{ isDrafting, draft }, draftDispatch] = useDraft<Partial<Insurance>[]>(insurances)
  const [{ data: toDelete }, toDeleteDispatch] = useArray<Insurance['id']>()

  if (!draft) { return <h3>Loading...</h3> }

  const toCreate = draft.filter(i => !i.id)
  const toUpdate = draft.filter(i => i.id && !toDelete.includes(i.id))
  const canSave = isDrafting || toDelete.length

  const onSaveHandler = async () => {
    notify({ id: 'INSURANCE_SAVE', text: 'Salvando...' })
    const { data } = await fetchAPIWithAuth('/insurances/batch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ create: toCreate, update: toUpdate, delete: toDelete }),
    })

    const sorted = data.sort((a: Insurance, b: Insurance) => a.id - b.id)

    draftDispatch({ type: 'save', payload: sorted })
    toDeleteDispatch({ type: 'clear' })
    notify({ id: 'INSURANCE_SAVE', text: 'Salvo com sucesso', expiresInSeconds: 3 })
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
      toDeleteDispatch({ type: 'add', payload: draft[row].id as number })
    }
    draftDispatch({
      type: "draft",
      payload: [...draft.slice(0, row), ...draft.slice(row + 1)]
    })
  }

  return (
    <>
      <Head>
        <title>Planos de Saúde</title>
      </Head>
      <div className="flex mb-2">
        <h1 className="text-2xl">Planos de Saúde</h1>
        <div className="ml-auto">
          <Button text="Salvar" disabled={!canSave} onClick={onSaveHandler} />
          <Button text="Cancelar" disabled={!canSave} onClick={onCancelHandler} />
        </div>
      </div>
      <Table
        columns={[
          { header: 'Nome', id: 'name', isEditable: true },
          { header: 'Atualizado', id: 'updatedAt', format: stringifyDate },
          { header: 'Criado', id: 'createdAt', format: stringifyDate },
        ]}
        data={draft}
        inlineActions={<Table.InlineIcon builder={Trash} onClick={onDeleteHandler} />}
        footer={{ name: <a className="cursor-pointer">+ Adicionar</a> }}
        onCell={{ change: onChangeHandler }}
        onFooter={{ click: onAddHandler }}
      />
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