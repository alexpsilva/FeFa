import AppointmentSummary from "@/components/features/appointment/summary"
import ClientLink from "@/components/features/link"
import PacientCollapsibleCard from "@/components/features/pacient/collapsibleCard"
import PenIcon from "@/components/icons/pen"
import ContentCard from "@/components/layout/contentCard"
import Label from "@/components/ui/label"
import { AppointmentSchema } from "@/types/model/appointment"
import { PacientSchema } from "@/types/model/pacient"
import requestFromServer from "@/utils/request/fromServer"
import { Metadata } from "next"
import Link from "next/link"
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

const fetchAppointments = async (pacientId: number) => {
  const { response, error } = await requestFromServer(
    `/api/appointment?pacientId=${pacientId}`,
    { method: 'GET' },
    z.object({ data: z.array(AppointmentSchema), total: z.number() }),
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
  const { data: appointments } = await fetchAppointments(params.pacientId)
  const sortedAppointments = appointments.sort((a, b) => a.date < b.date ? 1 : -1)

  return (
    <main className="p-6 pt-8">
      <div className="flex flex-col gap-4 mx-auto max-w-5xl">
        <PacientCollapsibleCard
          pacient={pacient}
          initial="collapsed"
          readOnly={true}
        />
        <ContentCard>
          <div className="flex flex-row justify-between">
            <Label>Consultas</Label>
            <Link
              href={`/pacient/${pacient.id}/appointment/create`}
              className="text-sm font-bold text-skin-selected"
            >
              + Nova Consulta
            </Link>
          </div>
          <div className="h-5"></div>
          <div className="flex flex-col gap-3">
            {sortedAppointments.map(appointment => (
              <AppointmentSummary
                key={appointment.id}
                date={appointment.date}
                description={appointment.description}
                actions={[
                  <ClientLink
                    href={`/pacient/${pacient.id}/appointment/${appointment.id}`}
                  >
                    <PenIcon
                      width="21"
                      height="21"
                      className="stroke-skin-selected cursor-pointer"
                    />
                  </ClientLink>
                ]}
              />
            ))}
          </div>
        </ContentCard>
      </div>
    </main>
  )
}

export default ViewPacient