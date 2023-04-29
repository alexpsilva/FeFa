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
      <div className="mb-2">
        <h1 className="text-2xl">Pacientes</h1>
      </div>
      <SearchInput
        className="block mx-auto mt-3 mb-5 w-full max-w-md bg-gray-200"
        onSearch={onSearchHandler}
        hint="Buscar..."
      />
      <Table
        columns={[
          { header: 'Nome', id: 'name' },
          { header: 'Criado em', id: 'createdAt', format: stringifyDate },
        ]}
        data={pacients}
        onCell={{ click: index => router.push(`/pacient/${pacients[index].id}`) }}
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