import Button from "@/components/ui/button"
import PacientSheet from "@/components/features/pacient-sheet"
import useDraft from "@/hooks/useDraft"
import Pacient from "@/types/model/pacient"
import { NextPage } from "next"
import Head from "next/head"
import Appointment from "@/types/model/appointment"
import fetchAPIWithAuth from "@/utils/fetch-api-with-auth"

type Props = { pacient: Pacient, appointments: Appointment[] }
const EditPacient: NextPage<Props> = ({ pacient, appointments }) => {
  const [{ isDrafting, draft }, draftDispatch] = useDraft<Partial<Pacient>>(pacient)

  if (!draft) { return <h3>Loading...</h3> }

  const onSaveHandler = async () => {
    const { data } = await fetchAPIWithAuth(`/pacients/${pacient.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(draft)
    })
    draftDispatch({ type: 'save', payload: data })
  }

  const onDiscardHandler = () => { draftDispatch({ type: 'discard' }) }

  return (
    <>
      <Head>
        <title>Pacient</title>
      </Head>
      <PacientSheet
        pacient={draft}
        setPacient={(newData) => draftDispatch({ type: 'draft', payload: newData })}
        appointments={appointments}
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
  const {
    data: pacient,
    error: pacientError
  } = await fetchAPIWithAuth(`/pacients/${pacientId}`, { method: 'GET' }, ctx)
  if (pacientError) { throw new Error(pacientError.message) }

  const {
    data: appointments,
    error: appointmentError
  } = await fetchAPIWithAuth(`/appointments?pacientId=${pacientId}`, { method: 'GET' }, ctx)
  if (appointmentError) { throw new Error(appointmentError.message) }

  return { pacient, appointments }
}

export default EditPacient