import AppointmentSheet from "@/components/features/appointment-sheet"
import useNotify from "@/hooks/notifications/useNotify"
import Button from "@/components/ui/button"
import Appointment from "@/types/model/appointment"
import Pacient from "@/types/model/pacient"
import fetchAPIWithAuth from "@/auth/fetch-api-with-auth"
import { NextPage } from "next"
import Head from "next/head"
import { useRouter } from "next/router"
import { useState } from "react"

type Props = { pacients: Pacient[] }
const CreateAppointment: NextPage<Props> = ({ pacients }) => {
  const notify = useNotify()
  const router = useRouter()
  const [appointment, setAppointment] = useState<Partial<Appointment>>({
    pacientId: pacients[0].id,
    date: new Date()
  })

  if (!router.isReady) { return <h3>Loading...</h3> }

  const onCreateHandler = async () => {
    notify({ id: 'APPOINTMENT_SAVE', 'text': 'Salvando...' })
    const { response: data } = await fetchAPIWithAuth('/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(appointment)
    })

    notify({ id: 'APPOINTMENT_SAVE', 'text': 'Salvo com sucesso', 'expiresInSeconds': 3 })
    router.push(`/appointment/${data.id}`)
  }

  const onCancelHandler = () => { router.back() }

  return (
    <>
      <Head>
        <title>Appointment</title>
      </Head>
      <AppointmentSheet
        pacients={pacients}
        appointment={appointment}
        setAppointment={setAppointment}
      />
      <div style={{ float: 'right' }}>
        <Button text="Criar" disabled={!appointment.description} onClick={onCreateHandler} />
        <Button text="Cancelar" onClick={onCancelHandler} />
      </div>
    </>
  )
}

CreateAppointment.getInitialProps = async (ctx) => {
  const { response: data, error } = await fetchAPIWithAuth(`/pacients`, { method: 'GET' }, ctx)
  if (error) { throw new Error(error.message) }

  return { pacients: data.data }
}

export default CreateAppointment