import AppointmentSummary from "@/components/features/appointment/summary"
import PacientCollapsibleCard from "@/components/features/pacient/collapsibleCard"
import CurrentPage from "@/components/features/pagination/current-page"
import NextPage from "@/components/features/pagination/next-page"
import PreviousPage from "@/components/features/pagination/previous-page"
import PenIcon from "@/components/icons/pen"
import ContentCard from "@/components/layout/contentCard"
import BackButton from "@/components/ui/back-button"
import Label from "@/components/ui/label"
import { PAGINATION_PAGE_SIZE } from "@/constants"
import { listAppointments } from "@/database/appointment"
import { getPacient } from "@/database/pacient"
import protectedPage from "@/utils/auth/protected-page"
import { Metadata } from "next"
import Link from "next/link"
import { z } from "zod"
import AppointmentPaginationControls from "./pagination"

export const metadata: Metadata = { title: 'Paciente' }

const Props = z.object({
  params: z.object({
    pacientId: z.coerce.number()
  }),
  searchParams: z.object({
    pageSize: z.optional(z.coerce.number()),
    pageOffset: z.optional(z.coerce.number()),
  }),
})
type Props = z.infer<typeof Props>

const ViewPacient = protectedPage(async (props: Props, userId: number) => {
  const { params, searchParams } = Props.parse(props)

  const pageSize = searchParams.pageSize || PAGINATION_PAGE_SIZE
  const pageOffset = searchParams.pageOffset || 0

  const pacient = await getPacient(userId, params.pacientId)
  if (!pacient) { throw Error(`Pacient #${params.pacientId} not found`) }

  const { appointments, total } = await listAppointments(userId, params.pacientId, pageSize, pageOffset)
  const sortedAppointments = appointments.sort((a, b) => a.date < b.date ? 1 : -1)

  return (
    <main className="p-6 pt-8">
      <div className="flex flex-col gap-4 mx-auto max-w-5xl">
        <BackButton href="/pacient" className="self-end" />
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
                  <Link
                    key={appointment.id}
                    href={`/pacient/${pacient.id}/appointment/${appointment.id}`}
                  >
                    <PenIcon
                      width="21"
                      height="21"
                      className="stroke-skin-selected"
                    />
                  </Link>
                ]}
              />
            ))}
          </div>
          <div className="h-5"></div>
          <AppointmentPaginationControls
            className="flex items-center justify-end gap-2"
            pacientId={pacient.id}
            totalElements={total}
            pageSize={pageSize}
            pageOffset={pageOffset}
          >
            <PreviousPage className="stroke-skin-selected" />
            <CurrentPage />
            <NextPage className="stroke-skin-selected" />
          </AppointmentPaginationControls>
        </ContentCard>
      </div>
    </main>
  )
})

export default ViewPacient