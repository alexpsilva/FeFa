import Button from "@/components/ui/button"
import PacientSheet from "@/components/features/pacient-sheet"
import useDraft from "@/hooks/useDraft"
import Pacient from "@/types/model/pacient"
import fetchAPI from "@/utils/fetch-api"
import { NextPage } from "next"
import Head from "next/head"
import Appointment from "@/types/model/appointment"

type Props = { pacient: Pacient, appointments: Appointment[] }
const EditPacient: NextPage<Props> = ({ pacient, appointments }) => {
  const [{ isDrafting, draft }, draftDispatch] = useDraft<Partial<Pacient>>(pacient)

  if (!draft) { return <h3>Loading...</h3> }

  const onSaveHandler = async () => {
    const [newPacient, error] = await fetchAPI(`/pacients/${pacient.id}`, {
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
  const [pacient, pacientError] = await fetchAPI(`/pacients/${pacientId}`, { method: 'GET' })
  if (pacientError) { throw new Error(pacientError) }

  const [appointments, appointmentError] = await fetchAPI(`/appointments?pacientId=${pacientId}`, { method: 'GET' })
  if (appointmentError) { throw new Error(appointmentError) }

  return { pacient, appointments }
}

export default EditPacient