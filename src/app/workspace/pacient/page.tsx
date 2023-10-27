import { Metadata } from "next"
import Link from "next/link"

import { PAGINATION_PAGE_SIZE } from "@/constants"
import stringifyDate from "@/utils/date/stringify-date"
import { PacientSchema } from "@/types/model/pacient"
import { z } from "zod"
import requestFromServer from "@/utils/request/fromServer"
import { RequestOptions } from "@/utils/request/types"
import RedirectTable from "@/components/layout/table/redirect-table"
import SearchPacient from "./search"
import PacientPaginationControls from "./pagination"
import PreviousPage from "@/components/features/pagination/previous-page"
import CurrentPage from "@/components/features/pagination/current-page"
import NextPage from "@/components/features/pagination/next-page"

export const metadata: Metadata = { title: 'Pacientes' }

const fetchPacients = async (term?: string, pageSize?: number, pageOffset?: number) => {
  const options: RequestOptions = { method: 'GET' }

  options.query = { pageSize: pageSize || PAGINATION_PAGE_SIZE }
  if (term) { options.query.term = term }
  if (pageOffset) { options.query.pageOffset = pageOffset }

  const { response, error } = await requestFromServer(
    '/api/pacient',
    z.object({ data: z.array(PacientSchema), total: z.number() }),
    options,
  )

  if (error) { throw new Error(error.message) }
  return response
}

const Props = z.object({
  searchParams: z.object({
    term: z.optional(z.string()),
    pageSize: z.optional(z.coerce.number()),
    pageOffset: z.optional(z.coerce.number()),
  })
})
type Props = z.infer<typeof Props>

export default async function ListPacients(props: Props) {
  const { searchParams } = Props.parse(props)

  const term = searchParams.term || ''
  const pageSize = searchParams.pageSize || PAGINATION_PAGE_SIZE
  const pageOffset = searchParams.pageOffset || 0

  const pacientsResponse = await fetchPacients(term, pageSize, pageOffset)

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold text-skin-base">Pacientes</h1>
      <div className="border-t-2 pt-2 border-gray-200">
        <SearchPacient placeholder="Buscar..." defaultValue={term} />
        <RedirectTable
          columns={[
            { header: 'Nome', id: 'name' },
            { header: 'Criado', id: 'createdAt', format: stringifyDate },
          ]}
          data={pacientsResponse.data}
          rowHref={(pacient) => `/pacient/${pacient.id}`}
          footer={{ name: <Link href='/pacient/create'>+ Adicionar</Link> }}
        />
        <PacientPaginationControls
          className="flex items-center justify-end mx-3"
          term={term}
          totalElements={pacientsResponse.total}
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
        </PacientPaginationControls>
      </div>
    </main>
  )
}