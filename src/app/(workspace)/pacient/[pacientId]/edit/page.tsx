import { Metadata } from "next"

import DeleteButton from "./delete"
import EditForm from "./form"
import Button from "@/components/ui/button"
import PacientCard from "@/components/features/pacient/card"
import requestFromServer from "@/utils/request/fromServer"
import { PacientSchema } from "@/types/model/pacient"
import { z } from "zod"

export const metadata: Metadata = { title: 'Editar Paciente' }

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

export default async function EditPacient(props: Props) {
  const { params } = Props.parse(props)
  const pacient = await fetchPacient(params.pacientId)

  return (
    <main className="p-6 pt-8">
      <EditForm
        pacientId={pacient.id}
        className="flex flex-col gap-4 mx-auto max-w-5xl"
      >
        <PacientCard
          pacient={pacient}
          action={<DeleteButton pacientId={pacient.id} />}
        />
        <div className="self-end flex gap-2 pr-2">
          <Button type='submit' className="bg-skin-selected text-white">Salvar</Button>
          <Button type='link' href={`/pacient/${pacient.id}`}>Cancelar</Button>
        </div>
      </EditForm>
    </main>
  )
}