import { Metadata } from "next"

import Button from "@/components/ui/button"
import requestFromServer from "@/utils/request/fromServer"
import { PacientSchema } from "@/types/model/pacient"
import { z } from "zod"
import DeleteButton from "./delete"
import { AppointmentSchema } from "@/types/model/appointment"
import AppointmentHeader from "@/components/features/appointment/header"
import AppointmentDescription from "@/components/features/appointment/description"
import EditForm from "./form"

export const metadata: Metadata = { title: 'Editar Consulta' }

const fetchPacient = async (id: number) => {
  const { response, error } = await requestFromServer(
    `/api/pacient/${id}`,
    { method: 'GET' },
    PacientSchema
  )

  if (error) { throw new Error(error.message) }
  return response
}

const fetchAppointment = async (id: number) => {
  const { response, error } = await requestFromServer(
    `/api/appointment/${id}`,
    { method: 'GET' },
    AppointmentSchema
  )

  if (error) { throw new Error(error.message) }
  return response
}

const Props = z.object({
  params: z.object({
    pacientId: z.coerce.number(),
    appointmentId: z.coerce.number()
  })
})
type Props = z.infer<typeof Props>

export default async function EditAppointment(props: Props) {
  const { params } = Props.parse(props)
  const pacient = await fetchPacient(params.pacientId)
  const appointment = await fetchAppointment(params.appointmentId)

  if (appointment.pacientId != pacient.id) {
    throw new Error(`Pacient #${pacient.id} does not have a Appointment #${appointment.id}`)
  }

  return (
    <main className="p-6 pt-8">
      <EditForm
        appointmentId={appointment.id}
        className="flex flex-col gap-4 mx-auto max-w-5xl"
      >
        <AppointmentHeader
          pacientName={pacient.name}
          date={appointment.date}
          action={<DeleteButton pacientId={pacient.id} appointmentId={appointment.id} />}
        />
        <AppointmentDescription description={appointment.description} />
        <div className="self-end flex gap-2 pr-2">
          <Button type='submit' className="bg-skin-selected text-white">Salvar</Button>
          <Button type='link' href={`/pacient/${pacient.id}`}>Cancelar</Button>
        </div>
      </EditForm>
    </main>
  )
}