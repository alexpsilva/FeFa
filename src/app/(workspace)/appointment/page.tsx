import { Metadata } from "next"
import Link from "next/link"

import { PAGINATION_PAGE_SIZE } from "@/constants"
import stringifyDate from "@/utils/date/stringify-date"
import { PacientSchema } from "@/types/model/pacient"
import { z } from "zod"
import requestFromServer from "@/utils/request/fromServer"
import { RequestOptions } from "@/utils/request/types"
import RedirectTable from "@/components/layout/table/redirect-table"
import PreviousPage from "@/components/features/pagination/previous-page"
import CurrentPage from "@/components/features/pagination/current-page"
import NextPage from "@/components/features/pagination/next-page"
import { AppointmentSchema } from "@/types/model/appointment"
import AppointmentPaginationControls from "./pagination"

export const metadata: Metadata = { title: 'Consultas' }

const AppointmentWithPacientSchema = AppointmentSchema.merge(z.object({ pacient: PacientSchema }))

const fetchAppointments = async (pageSize?: number, pageOffset?: number) => {
  const options: RequestOptions = { method: 'GET' }

  options.query = { pageSize: pageSize || PAGINATION_PAGE_SIZE }
  if (pageOffset) { options.query.pageOffset = pageOffset }

  const { response, error } = await requestFromServer(
    '/api/appointment',
    options,
    z.object({ data: z.array(AppointmentWithPacientSchema), total: z.number() }),
  )

  if (error) { throw new Error(error.message) }

  const mappedAppointments = response.data.map(responseItem => {
    const { pacient, ...apointment } = responseItem
    return { pacientName: pacient.name, ...apointment }
  })

  return { data: mappedAppointments, total: response.total }
}

const Props = z.object({
  searchParams: z.object({
    pageSize: z.optional(z.coerce.number()),
    pageOffset: z.optional(z.coerce.number()),
  })
})
type Props = z.infer<typeof Props>

export default async function ListPacients(props: Props) {
  const { searchParams } = Props.parse(props)

  const pageSize = searchParams.pageSize || PAGINATION_PAGE_SIZE
  const pageOffset = searchParams.pageOffset || 0

  const appointmentsResponse = await fetchAppointments(pageSize, pageOffset)

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold text-skin-base">Consultas</h1>
      <div className="border-t-2 pt-2 border-gray-200">
        <RedirectTable
          columns={[
            { header: 'Paciente', id: 'pacientName' },
            { header: 'Criada', id: 'createdAt', format: stringifyDate },
          ]}
          data={appointmentsResponse.data}
          rowHref={appointment => `/appointment/${appointment.id}`}
          footer={{ pacientName: <Link href='/appointment/create'>+ Adicionar</Link> }}
        />
        <AppointmentPaginationControls
          className="flex items-center justify-end mx-3"
          totalElements={appointmentsResponse.total}
          pageSize={pageSize}
          pageOffset={pageOffset}
        >
          <PreviousPage
            className="
              p-1 stroke-skin-base 
              hover:stroke-skin-selected hover:bg-gray-200 rounded-md"
          />
          <CurrentPage
            className="p-1 px-2 text-skin-base"
          />
          <NextPage
            className="
              p-1 stroke-skin-base 
              hover:stroke-skin-selected hover:bg-gray-200 rounded-md"
          />
        </AppointmentPaginationControls>
      </div>
    </main>
  )
}