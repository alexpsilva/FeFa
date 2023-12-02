import PacientCollapsibleCard from "@/components/features/pacient/collapsibleCard"
import { PacientSchema } from "@/types/model/pacient"
import dateDifference from "@/utils/date/date-difference"
import requestFromServer from "@/utils/request/fromServer"
import { Metadata } from "next"
import { z } from "zod"

export const metadata: Metadata = { title: 'Paciente' }

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

const ViewPacient = async (props: Props) => {
  const { params } = Props.parse(props)
  const pacient = await fetchPacient(params.pacientId)
  const pacientAge = dateDifference(
    pacient.birthday,
    new Date(),
    'years'
  )

  return (
    <main className="p-6 pt-8">
      <PacientCollapsibleCard
        pacient={pacient}
        initial="collapsed"
        readOnly={true}
        className="mx-auto max-w-5xl"
      />
    </main>
  )
}

export default ViewPacient