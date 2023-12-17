import { Metadata } from "next"
import Link from "next/link"

import { PAGINATION_PAGE_SIZE } from "@/constants"
import { z } from "zod"
import SearchPacient from "./search"
import PacientPaginationControls from "./pagination"
import PreviousPage from "@/components/features/pagination/previous-page"
import CurrentPage from "@/components/features/pagination/current-page"
import NextPage from "@/components/features/pagination/next-page"
import ContentCard from "@/components/layout/contentCard"
import ClientLinkLI from "@/components/features/link/li"
import protectedPage from "@/utils/auth/protected-page"
import { listPacients } from "@/database/pacient"

export const metadata: Metadata = { title: 'Pacientes' }

const Props = z.object({
  searchParams: z.object({
    term: z.optional(z.string()),
    pageSize: z.optional(z.coerce.number()),
    pageOffset: z.optional(z.coerce.number()),
  })
})
type Props = z.infer<typeof Props>

const ListPacients = protectedPage(async (props: Props, userId: number) => {
  const { searchParams } = Props.parse(props)

  const term = searchParams.term || ''
  const pageSize = searchParams.pageSize || PAGINATION_PAGE_SIZE
  const pageOffset = searchParams.pageOffset || 0

  const { pacients, total } = await listPacients(userId, term, pageSize, pageOffset)

  return (
    <main className="p-4">
      <div className="flex flex-col mx-auto max-w-5xl">
        <SearchPacient
          defaultValue={term}
          className="self-center w-full max-w-lg rounded-lg bg-white stroke-skin-selected"
        />
        <div className="h-12"></div>
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
            {pacients.map(pacient => (
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
            totalElements={total}
            pageSize={pageSize}
            pageOffset={pageOffset}
          >
            <PreviousPage className="stroke-skin-selected" />
            <CurrentPage />
            <NextPage className="stroke-skin-selected" />
          </PacientPaginationControls>
        </ContentCard>
      </div>
    </main>
  )
})

export default ListPacients