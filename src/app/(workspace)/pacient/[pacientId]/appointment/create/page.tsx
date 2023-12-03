import { Metadata } from "next"

import CreateForm from "./form"
import Button from "@/components/ui/button"
import PacientCard from "@/components/features/pacient/card"
import AppointmentHeader from "@/components/features/appointment/header"
import { z } from "zod"
import { PacientSchema } from "@/types/model/pacient"
import requestFromServer from "@/utils/request/fromServer"
import AppointmentDescription from "@/components/features/appointment/description"

export const metadata: Metadata = { title: 'Criar Consulta' }

const fetchPacient = async (id: number) => {
  const { response, error } = await requestFromServer(
    `/api/pacient/${id}`,
    { method: 'GET' },
    PacientSchema
  )

  if (error) { throw new Error(error.message) }
  return response
}

const Props = z.object({
  params: z.object({
    pacientId: z.coerce.number()
  })
})
type Props = z.infer<typeof Props>

export default async function CreatePacient(props: Props) {
  const { params: { pacientId } } = Props.parse(props)
  const pacient = await fetchPacient(pacientId)

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
}