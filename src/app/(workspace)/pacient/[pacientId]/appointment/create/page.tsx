import { Metadata } from "next"

import CreateForm from "./form"
import Button from "@/components/ui/button"
import AppointmentHeader from "@/components/features/appointment/header"
import { z } from "zod"
import AppointmentDescription from "@/components/features/appointment/description"
import protectedPage from "@/utils/auth/protected-page"
import { getPacient } from "@/database/pacient"

export const metadata: Metadata = { title: 'Criar Consulta' }

const Props = z.object({
  params: z.object({
    pacientId: z.coerce.number()
  })
})
type Props = z.infer<typeof Props>

const CreateAppointment = protectedPage(async (props: Props, userId) => {
  const { params: { pacientId } } = Props.parse(props)

  const pacient = await getPacient(userId, pacientId)
  if (!pacient) { throw Error(`Pacient #${pacientId} not found`) }

  return (
    <main className="p-6 pt-8">
      <CreateForm pacientId={pacientId} className="flex flex-col gap-4 mx-auto max-w-5xl">
        <AppointmentHeader pacientName={pacient.name} />
        <AppointmentDescription />
        <div className="self-end flex gap-2 pr-2">
          <Button type='submit' className="bg-skin-selected text-white">Salvar</Button>
          <Button type='link' href={`/pacient/${pacientId}`}>Cancelar</Button>
        </div>
      </CreateForm>
    </main>
  )
})

export default CreateAppointment