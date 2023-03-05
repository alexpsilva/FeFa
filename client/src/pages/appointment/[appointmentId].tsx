import AppointmentSheet from "@/components/features/appointment-sheet"
import Button from "@/components/ui/button"
import useDraft from "@/hooks/useDraft"
import Appointment from "@/types/model/appointment"
import Pacient from "@/types/model/pacient"
import fetchAPI from "@/utils/fetch-api"
import { NextPage } from "next"
import Head from "next/head"

type Props = { appointment: Appointment, pacients: Pacient[] }
const EditAppointment: NextPage<Props> = ({ appointment, pacients }) => {
  const [{ isDrafting, draft }, draftDispatch] = useDraft<Partial<Appointment>>(appointment)

  if (!draft) { return <h3>Loading...</h3> }

  const onSaveHandler = async () => {
    const [newAppointment, error] = await fetchAPI(`/appointments/${appointment.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(draft)
    })
    draftDispatch({ type: 'save', payload: newAppointment })
  }

  const onDiscardHandler = () => { draftDispatch({ type: 'discard' }) }

  return (
    <>
      <Head>
        <title>Appointment</title>
      </Head>
      <AppointmentSheet
        pacients={pacients}
        appointment={draft}
        setAppointment={(newAppointment) => draftDispatch({ type: 'draft', payload: newAppointment })}
      />
      <div style={{ float: 'right' }}>
        <Button text="Salvar" disabled={!isDrafting} onClick={onSaveHandler} />
        <Button text="Descartar" disabled={!isDrafting} onClick={onDiscardHandler} />
      </div>
    </>
  )
}

EditAppointment.getInitialProps = async (ctx) => {
  const appointmentId = ctx.query.appointmentId as string
  const [appointment, appointmentError] = await fetchAPI(`/appointments/${appointmentId}`, { method: 'GET' })
  if (appointmentError) { throw new Error(appointmentError) }

  const [pacients, pacientsError] = await fetchAPI(`/pacients`, { method: 'GET' })
  if (pacientsError) { throw new Error(pacientsError) }

  return { appointment, pacients }
}

export default EditAppointment