import ArrowHeadIcon from "@/components/icons/arrowHead"
import PenIcon from "@/components/icons/pen"
import ContentCard from "@/components/layout/contentCard"
import Stacked from "@/components/layout/stacked"
import Input from "@/components/ui/input/input"
import Label from "@/components/ui/label"
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
      <ContentCard
        className="
          mx-auto max-w-5xl
          text-skin-base stroke-skin-base
          flex flex-row"
      >
        <div
          className="grid grid-rows-1 grid-cols-2 grid-flow-row 
          gap-y-4 gap-x-8"
        >
          <Stacked>
            <Label htmlFor="name">Nome</Label>
            <Input name="name" defaultValue={pacient.name} readOnly />
          </Stacked>
          <Stacked>
            <Label htmlFor="age">Idade</Label>
            <Input
              name="age"
              defaultValue={`${pacientAge} anos`}
              className="w-[13ch]"
              readOnly
            />
          </Stacked>
          {pacient.note ?
            <Stacked className="col-span-2">
              <Label htmlFor="note">Nota</Label>
              <Input name="note" defaultValue={pacient.note} readOnly />
            </Stacked>
            : null
          }
        </div>
        <div className="flex flex-col justify-between">
          <PenIcon
            width="21"
            height="21"
            className="stroke-skin-selected cursor-pointer"
          />
          <ArrowHeadIcon
            width="24"
            height="24"
            direction="down"
            className="stroke-skin-selected cursor-pointer"
          />
        </div>
      </ContentCard>
    </main>
  )
}

export default ViewPacient