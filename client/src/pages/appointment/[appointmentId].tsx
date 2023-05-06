import AppointmentSheet from "@/components/features/appointment-sheet"
import Button from "@/components/ui/button"
import useDraft from "@/hooks/useDraft"
import Appointment, { AppointmentSchema } from "@/types/model/appointment"
import Pacient, { PacientSchema } from "@/types/model/pacient"
import authenticatedRequest from "@/auth/authenticated-request"
import { NextPage } from "next"
import Head from "next/head"
import { z } from "zod"
import useRequestWhileLoading from "@/hooks/useRequestWhileLoading"

type Props = { appointment: Appointment, pacients: Pacient[] }
const EditAppointment: NextPage<Props> = ({ appointment, pacients }) => {
  const [{ isDrafting, draft }, draftDispatch] = useDraft<Partial<Appointment>>(appointment)
  const whileLoading = useRequestWhileLoading()

  if (!draft) { return <h3>Loading...</h3> }

  const onSaveHandler = async () => {

    const saveRequest = () => authenticatedRequest(
      `/appointments/${appointment.id}`,
      AppointmentSchema,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(draft)
      }
    )

    const { response, error } = await whileLoading(
      saveRequest,
      {
        loading: 'Salvando...',
        success: 'Consulta salva com sucesso',
        failure: 'Falha ao salvar consulta',
      },
    )

    if (!error) {
      draftDispatch({ type: 'save', payload: response })
    }
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
  const { response: appointment, error: appointmentError } = await authenticatedRequest(
    `/appointments/${appointmentId}`,
    AppointmentSchema,
    { method: 'GET' },
    ctx,
  )
  if (appointmentError) { throw new Error(appointmentError.message) }

  const { response: pacientsResponse, error: pacientsError } = await authenticatedRequest(
    `/pacients`,
    z.object({ data: z.array(PacientSchema) }),
    { method: 'GET' },
    ctx
  )
  if (pacientsError) { throw new Error(pacientsError.message) }

  return { appointment, pacients: pacientsResponse.data }
}

export default EditAppointment