import Button from "@/components/button"
import PacientSheet from "@/components/pacient-sheet"
import useDraft from "@/hooks/useDraft"
import Pacient from "@/types/model/pacient"
import fetchAPI from "@/utils/fetch-api"
import { NextPage } from "next"
import Head from "next/head"

type Props = { data: Pacient }
const EditPacient: NextPage<Props> = ({ data }) => {
  const [{ isDrafting, draft }, draftDispatch] = useDraft<Partial<Pacient>>(data)

  if (!draft) { return <h3>Loading...</h3> }

  const onSaveHandler = async () => {
    const [newPacient, error] = await fetchAPI(`/pacients/${data.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(draft)
    })
    draftDispatch({ type: 'save', payload: newPacient })
  }

  const onDiscardHandler = () => { draftDispatch({ type: 'discard' }) }

  return (
    <>
      <Head>
        <title>Pacient</title>
      </Head>
      <PacientSheet
        data={draft}
        setData={(newData) => draftDispatch({ type: 'draft', payload: newData })}
      />
      <div style={{ float: 'right' }}>
        <Button text="Salvar" disabled={!isDrafting} onClick={onSaveHandler} />
        <Button text="Descartar" disabled={!isDrafting} onClick={onDiscardHandler} />
      </div>
    </>
  )
}

EditPacient.getInitialProps = async (ctx) => {
  const pacientId = ctx.query.pacientId as string
  const [data, error] = await fetchAPI(`/pacients/${pacientId}`, { method: 'GET' })

  if (error) { throw new Error(error) }
  return { data }
}

export default EditPacient