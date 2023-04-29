import Table from "@/components/layout/table/table"
import Pacient from "@/types/model/pacient"
import fetchAPIWithAuth from "@/auth/fetch-api-with-auth"
import stringifyDate from "@/utils/date/stringify-date"
import { NextPage } from "next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import SearchInput from "@/components/features/search-input"
import { useState } from "react"
import SearchIcon from "@/components/icons/search"

type Props = { initialPacients: Pacient[] }
const ListPacients: NextPage<Props> = ({ initialPacients }) => {

  const [pacients, setPacients] = useState<Pacient[]>(initialPacients)
  const router = useRouter()
  if (!router.isReady) { return <h3>Loading...</h3> }

  const onSearchHandler = async (term: string) => {
    const { data, error } = await fetchAPIWithAuth(`/pacients?name=${term}`, { method: 'GET' })
    if (error) { throw new Error(error.message) }

    setPacients(data.sort((a: Pacient, b: Pacient) => a.id - b.id))
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
          onSearch={onSearchHandler}
          hint="Buscar..."
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
    </>
  )
}

ListPacients.getInitialProps = async (ctx) => {
  const { data, error } = await fetchAPIWithAuth('/pacients', { method: 'GET' }, ctx)

  if (error) { throw new Error(error.message) }
  return {
    initialPacients: data.sort((a: Pacient, b: Pacient) => a.id - b.id),
  }
}

export default ListPacients