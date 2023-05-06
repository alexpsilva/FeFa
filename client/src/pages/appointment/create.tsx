import AppointmentSheet from "@/components/features/appointment-sheet"
import Button from "@/components/ui/button"
import Appointment, { AppointmentSchema } from "@/types/model/appointment"
import Pacient, { PacientSchema } from "@/types/model/pacient"
import authenticatedRequest from "@/auth/authenticated-request"
import { NextPage } from "next"
import Head from "next/head"
import { useRouter } from "next/router"
import { useState } from "react"
import useRequestWhileLoading from "@/hooks/useRequestWhileLoading"
import { z } from "zod"

type Props = { pacients: Pacient[] }
const CreateAppointment: NextPage<Props> = ({ pacients }) => {
  const router = useRouter()
  const [appointment, setAppointment] = useState<Partial<Appointment>>({
    pacientId: pacients[0].id,
    date: new Date()
  })
  const whileLoading = useRequestWhileLoading()

  if (!router.isReady) { return <h3>Loading...</h3> }

  const onCreateHandler = async () => {
    const saveRequest = () => authenticatedRequest(
      '/appointments',
      AppointmentSchema,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(appointment)
      }
    )

    const { response, error } = await whileLoading(
      saveRequest,
      {
        loading: 'Salvando...',
        success: 'Consulta criada com sucesso',
        failure: 'Falha ao criar consulta',
      },
    )

    if (!error) {
      router.push(`/appointment/${response.id}`)
    }
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
  const { response, error } = await authenticatedRequest(
    `/pacients`,
    z.object({ data: z.array(PacientSchema) }),
    { method: 'GET' },
    ctx
  )
  if (error) { throw new Error(error.message) }

  return { pacients: response.data }
}

export default CreateAppointment