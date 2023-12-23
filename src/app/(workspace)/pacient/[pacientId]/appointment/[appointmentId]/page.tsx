import { Metadata } from "next"

import Button from "@/components/ui/button"
import { z } from "zod"
import DeleteButton from "./delete"
import AppointmentHeader from "@/components/features/appointment/header"
import AppointmentDescription from "@/components/features/appointment/description"
import EditForm from "./form"
import protectedPage from "@/utils/auth/protected-page"
import { getPacient } from "@/database/pacient"
import { getAppointment } from "@/database/appointment"
import BackButton from "@/components/ui/back-button"

export const metadata: Metadata = { title: 'Editar Consulta' }

const Props = z.object({
  params: z.object({
    pacientId: z.coerce.number(),
    appointmentId: z.coerce.number()
  })
})
type Props = z.infer<typeof Props>

const EditAppointment = protectedPage(async (props: Props, userId: number) => {
  const { params } = Props.parse(props)

  const pacient = await getPacient(userId, params.pacientId)
  if (!pacient) { throw Error(`Pacient #${params.pacientId} not found`) }

  const appointment = await getAppointment(userId, params.appointmentId)
  if (!appointment) { throw Error(`Appointment #${params.appointmentId} not found`) }

  if (appointment.pacientId != pacient.id) {
    throw new Error(`Pacient #${pacient.id} does not have a Appointment #${appointment.id}`)
  }

  return (
    <main className="p-6 pt-8">
      <EditForm
        appointmentId={appointment.id}
        className="flex flex-col gap-4 mx-auto max-w-5xl"
      >
        <BackButton href={`/pacient/${pacient.id}`} className="self-end" />
        <AppointmentHeader
          pacientName={pacient.name}
          date={appointment.date}
        />
        <AppointmentDescription description={appointment.description} />
        <div className="flex flex-row justify-between px-2">
          <DeleteButton pacientId={pacient.id} appointmentId={appointment.id}>
            Deletar
          </DeleteButton>
          <div className="flex flex-row gap-2">
            <Button type='link' href={`/pacient/${pacient.id}`}>Cancelar</Button>
            <Button type='submit' className="bg-skin-selected text-white">Salvar</Button>
          </div>
        </div>
      </EditForm>
    </main>
  )
})

export default EditAppointment