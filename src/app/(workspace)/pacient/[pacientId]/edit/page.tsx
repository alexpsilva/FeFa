import { Metadata } from "next"

import DeleteButton from "./delete"
import EditForm from "./form"
import Button from "@/components/ui/button"
import PacientCard from "@/components/features/pacient/card"
import { z } from "zod"
import protectedPage from "@/utils/auth/protected-page"
import { getPacient } from "@/database/pacient"

export const metadata: Metadata = { title: 'Editar Paciente' }

const Props = z.object({
  params: z.object({
    pacientId: z.coerce.number()
  })
})
type Props = z.infer<typeof Props>

const EditPacient = protectedPage(async (props: Props, userId: number) => {
  const { params } = Props.parse(props)

  const pacient = await getPacient(userId, params.pacientId)
  if (!pacient) { throw Error(`Pacient #${params.pacientId} not found`) }

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
          <Button type='link' href={`/pacient/${pacient.id}`}>Cancelar</Button>
          <Button type='submit' className="bg-skin-selected text-white">Salvar</Button>
        </div>
      </EditForm>
    </main>
  )
})

export default EditPacient