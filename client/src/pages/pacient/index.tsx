import { useState } from "react"
import { NextPage } from "next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"

import authenticatedRequest from "@/auth/authenticated-request"
import { PAGINATION_PAGE_SIZE } from "@/constants"
import stringifyDate from "@/utils/date/stringify-date"
import usePagination from "@/hooks/usePagination"
import Pacient, { PacientSchema } from "@/types/model/pacient"
import Table from "@/components/layout/table/table"
import SearchIcon from "@/components/icons/search"
import PaginationControls from "@/components/features/pagination"
import SearchInput from "@/components/features/search-input"
import useRequestWhileLoading from "@/hooks/useRequestWhileLoading"
import { z } from "zod"

type Props = { initialPacients: Pacient[], initialTotalPacients: number }
const ListPacients: NextPage<Props> = ({ initialPacients, initialTotalPacients }) => {
  const whileLoading = useRequestWhileLoading()

  const [pacients, setPacients] = useState<Pacient[]>(initialPacients)
  const [totalPacients, setTotalPacients] = useState<number>(initialTotalPacients)

  const [searchTerm, setSearchTerm] = useState<string>('')
  const [pagination, paginationDispatch] = usePagination(totalPacients, PAGINATION_PAGE_SIZE)

  const router = useRouter()

  const refetchPacients = async (term: string, pageSize: number, pageOffset: number) => {
    const refreshRequest = () => authenticatedRequest(
      '/pacients',
      z.object({ data: z.array(PacientSchema), total: z.number() }),
      {
        method: 'GET', query: {
          pageSize,
          ...(term && { term }),
          ...(pageOffset && { pageOffset })
        }
      }
    )

    const { response, error } = await whileLoading(
      refreshRequest,
      {
        loading: 'Carregando...',
        failure: 'Falha ao carregar pacientes',
      },
    )

    if (!error) {
      setPacients(response.data.sort((a: Pacient, b: Pacient) => a.id - b.id))
      setTotalPacients(response.total)
    }
  }

  const onSearch = (newTerm: string) => {
    return refetchPacients(newTerm, PAGINATION_PAGE_SIZE, pagination.current.offset)
  }

  const onPagination = (offset: number) => {
    return refetchPacients(searchTerm, PAGINATION_PAGE_SIZE, offset)
  }

  return (
    <>
      <Head>
        <title>Pacientes</title>
      </Head>
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-skin-base">Pacientes</h1>
      </div>
      <hr className="mb-6 border-b-2 border-gray-200 rounded-full"></hr>
      <div className="
          flex items-center justify-center 
          mx-auto mt-3 mb-5 max-w-md 
          rounded-lg bg-gray-200"
      >
        <SearchIcon
          className='mx-1 stroke-skin-base'
          width="22"
          height="22"
        />
        <SearchInput
          className="flex-grow ml-1 bg-transparent focus:outline-none"
          term={searchTerm}
          setTerm={setSearchTerm}
          onSearch={onSearch}
          placeholder="Buscar..."
        />
      </div>
      <Table
        columns={[
          { header: 'Nome', id: 'name' },
          { header: 'Criado', id: 'createdAt', format: stringifyDate },
        ]}
        data={pacients}
        onRow={{ click: index => router.push(`/pacient/${pacients[index].id}`) }}
        footer={{ name: <Link href='/pacient/create'>+ Adicionar</Link> }}
      />
      <PaginationControls
        className="flex items-center justify-end mx-3"
        state={pagination}
        dispatch={paginationDispatch}
      >
        <PaginationControls.PreviousPage
          className="
            p-1 stroke-skin-base 
            enabled:hover:stroke-skin-selected enabled:hover:bg-gray-200 enabled:rounded-md
            disabled:opacity-30"
          onClick={onPagination}
        />
        <PaginationControls.CurrentPage
          className="p-1 px-2 text-skin-base"
        />
        <PaginationControls.NextPage
          className="
            p-1 stroke-skin-base 
            enabled:hover:stroke-skin-selected enabled:hover:bg-gray-200 enabled:rounded-md
            disabled:opacity-30"
          onClick={onPagination}
        />
      </PaginationControls>
    </>
  )
}

ListPacients.getInitialProps = async (ctx) => {
  const { response, error } = await authenticatedRequest(
    `/pacients?pageSize=${PAGINATION_PAGE_SIZE}`,
    z.object({ data: z.array(PacientSchema), total: z.number() }),
    { method: 'GET' },
    ctx,
  )

  if (error) { throw new Error(error.message) }
  return {
    initialPacients: response.data.sort((a: Pacient, b: Pacient) => a.id - b.id),
    initialTotalPacients: response.total
  }
}

export default ListPacients