import AppointmentSheet from "@/components/features/appointment-sheet"
import useNotify from "@/hooks/notifications/useNotify"
import Button from "@/components/ui/button"
import useDraft from "@/hooks/useDraft"
import Appointment from "@/types/model/appointment"
import Pacient from "@/types/model/pacient"
import authenticatedRequest from "@/auth/authenticated-request"
import { NextPage } from "next"
import Head from "next/head"

type Props = { appointment: Appointment, pacients: Pacient[] }
const EditAppointment: NextPage<Props> = ({ appointment, pacients }) => {
  const notify = useNotify()
  const [{ isDrafting, draft }, draftDispatch] = useDraft<Partial<Appointment>>(appointment)

  if (!draft) { return <h3>Loading...</h3> }

  const onSaveHandler = async () => {
    notify({ id: 'APPOINTMENT_SAVE', 'text': 'Salvando...' })
    const { response: data } = await authenticatedRequest(`/appointments/${appointment.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(draft)
    })

    notify({ id: 'APPOINTMENT_SAVE', 'text': 'Salvo com sucesso', 'expiresInSeconds': 3 })
    draftDispatch({ type: 'save', payload: data })
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
  const {
    response: appointment,
    error: appointmentError
  } = await authenticatedRequest(`/appointments/${appointmentId}`, { method: 'GET' }, ctx)
  if (appointmentError) { throw new Error(appointmentError.message) }

  const {
    response: { data: pacients },
    error: pacientsError
  } = await authenticatedRequest(`/pacients`, { method: 'GET' }, ctx)
  if (pacientsError) { throw new Error(pacientsError.message) }

  return { appointment, pacients }
}

export default EditAppointment