import AppointmentSheet from "@/components/appointment-sheet"
import Button from "@/components/button"
import Appointment from "@/types/model/appointment"
import Pacient from "@/types/model/pacient"
import fetchAPI from "@/utils/fetch-api"
import { NextPage } from "next"
import Head from "next/head"
import { useRouter } from "next/router"
import { useState } from "react"

type Props = { pacients: Pacient[] }
const CreateAppointment: NextPage<Props> = ({ pacients }) => {
  const router = useRouter()
  const [appointment, setAppointment] = useState<Partial<Appointment>>({
    pacientId: pacients[0].id,
    date: new Date()
  })

  if (!router.isReady) { return <h3>Loading...</h3> }

  const onCreateHandler = async () => {
    const [created, error] = await fetchAPI('/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(appointment)
    })
    router.push(`/appointment/${created.id}`)
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
  const [pacients, pacientsError] = await fetchAPI(`/pacients`, { method: 'GET' })
  if (pacientsError) { throw new Error(pacientsError) }

  return { pacients }
}

export default CreateAppointment