import { Metadata } from "next"
import Link from "next/link"

import { PAGINATION_PAGE_SIZE } from "@/constants"
import { PacientSchema } from "@/types/model/pacient"
import { z } from "zod"
import requestFromServer from "@/utils/request/fromServer"
import { RequestOptions } from "@/utils/request/types"
import SearchPacient from "./search"
import PacientPaginationControls from "./pagination"
import PreviousPage from "@/components/features/pagination/previous-page"
import CurrentPage from "@/components/features/pagination/current-page"
import NextPage from "@/components/features/pagination/next-page"
import ContentCard from "@/components/layout/contentCard"
import ClientLinkLI from "@/components/features/link/li"

export const metadata: Metadata = { title: 'Pacientes' }

const fetchPacients = async (term?: string, pageSize?: number, pageOffset?: number) => {
  const options: RequestOptions = { method: 'GET' }

  options.query = { pageSize: pageSize || PAGINATION_PAGE_SIZE }
  if (term) { options.query.term = term }
  if (pageOffset) { options.query.pageOffset = pageOffset }

  const { response, error } = await requestFromServer(
    '/api/pacient',
    options,
    z.object({ data: z.array(PacientSchema), total: z.number() }),
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
    <main className="p-4 flex flex-col gap-2">
      <SearchPacient
        defaultValue={term}
        className="self-center w-full max-w-lg rounded-lg bg-white stroke-skin-selected"
      />
      <div className="h-8"></div>
      <ContentCard className="flex flex-col gap-3">
        <div className="flex flex-row justify-between pr-3">
          <h1 className="text-sm">
            Pacientes
          </h1>
          <Link
            href='/pacient/create'
            className="text-sm font-bold text-skin-selected"
          >
            + Novo Paciente
          </Link>
        </div>
        <ul className="pl-2">
          {pacientsResponse.data.map(pacient => (
            <ClientLinkLI
              key={pacient.id}
              href={`/pacient/${pacient.id}`}
              className="
                py-2 
                border-b-2 last:border-0 border-slate-100
                hover:cursor-pointer
              "
            >
              {pacient.name}
            </ClientLinkLI>
          ))}
        </ul>
        <PacientPaginationControls
          className="flex items-center justify-end gap-2"
          term={term}
          totalElements={pacientsResponse.total}
          pageSize={pageSize}
          pageOffset={pageOffset}
        >
          <PreviousPage className="stroke-skin-selected" />
          <CurrentPage />
          <NextPage className="stroke-skin-selected" />
        </PacientPaginationControls>
      </ContentCard>
    </main>
  )
}