import Table from "@/components/layout/table/table"
import Pacient from "@/types/model/pacient"
import fetchAPIWithAuth from "@/auth/fetch-api-with-auth"
import stringifyDate from "@/utils/date/stringify-date"
import { NextPage } from "next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import SearchIcon from "@/components/icons/search"
import { PAGINATION_PAGE_SIZE } from "@/constants"
import PaginationControls from "@/components/features/pagination"
import usePagination from "@/hooks/usePagination"
import SearchInput from "@/components/features/search-input"

type Props = { initialPacients: Pacient[], initialTotalPacients: number }
const ListPacients: NextPage<Props> = ({ initialPacients, initialTotalPacients }) => {

  const [pacients, setPacients] = useState<Pacient[]>(initialPacients)
  const [totalPacients, setTotalPacients] = useState<number>(initialTotalPacients)

  const [searchTerm, setSearchTerm] = useState<string>('')
  const [pagination, paginationDispatch] = usePagination(totalPacients, PAGINATION_PAGE_SIZE)

  const router = useRouter()
  if (!router.isReady) { return <h3>Loading...</h3> }

  const refetchPacients = async (term: string, pageSize: number, pageOffset: number) => {
    const query = [`pageSize=${pageSize}`]
    if (term) { query.push(`name=${term}`) }
    if (pageOffset) { query.push(`pageOffset=${pageOffset}`) }

    const { response: data, error } = await fetchAPIWithAuth(`/pacients?${query.join('&')}`, { method: 'GET' })
    if (error) { throw new Error(error.message) }

    setPacients(data.data.sort((a: Pacient, b: Pacient) => a.id - b.id))
    setTotalPacients(data.total)
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
  const url = `/pacients?pageSize=${PAGINATION_PAGE_SIZE}`
  const { response: data, error } = await fetchAPIWithAuth(url, { method: 'GET' }, ctx)

  if (error) { throw new Error(error.message) }
  return {
    initialPacients: data.data.sort((a: Pacient, b: Pacient) => a.id - b.id),
    initialTotalPacients: data.total
  }
}

export default ListPacients