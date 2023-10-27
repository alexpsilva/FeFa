import Button from "@/components/ui/button"
import useDraft from "@/hooks/useDraft"
import Pacient, { PacientSchema } from "@/types/model/pacient"
import { NextPage } from "next"
import Head from "next/head"
import Appointment, { AppointmentSchema } from "@/types/model/appointment"
import authenticatedRequest from "@/auth/authenticated-request"
import PacientSheet from "@/components/features/pacient-sheet.tsx"
import useRequestWhileLoading from "@/hooks/useRequestWhileLoading"
import { z } from "zod"

type Props = { pacient: Pacient, appointments: Appointment[] }
const EditPacient: NextPage<Props> = ({ pacient, appointments }) => {
  const [{ isDrafting, draft }, draftDispatch] = useDraft<Partial<Pacient>>(pacient)
  const whileLoading = useRequestWhileLoading()

  if (!draft) { return <h3>Loading...</h3> }

  const onSaveHandler = async () => {
    const saveRequest = () => authenticatedRequest(
      `/pacients/${pacient.id}`,
      PacientSchema,
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
        success: 'Paciente salvo com sucesso',
        failure: 'Falha ao salvar paciente',
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

  const { response: pacient, error: pacientError } = await authenticatedRequest(
    `/pacients/${pacientId}`,
    PacientSchema,
    { method: 'GET' },
    ctx,
  )
  if (pacientError) { throw new Error(pacientError.message) }

  const { response: appointments, error: appointmentError } = await authenticatedRequest(
    `/appointments?pacientId=${pacientId}`,
    z.array(AppointmentSchema),
    { method: 'GET' },
    ctx,
  )
  if (appointmentError) { throw new Error(appointmentError.message) }

  return { pacient, appointments }
}

export default EditPacient