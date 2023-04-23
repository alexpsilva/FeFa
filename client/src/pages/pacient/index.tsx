import Table from "@/components/layout/table/table"
import Pacient from "@/types/model/pacient"
import fetchAPIWithAuth from "@/utils/fetch-api-with-auth"
import stringifyDate from "@/utils/stringify-date"
import { NextPage } from "next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"

type Props = { pacients: Pacient[] }
const ListPacients: NextPage<Props> = ({ pacients }) => {
  const router = useRouter()
  if (!router.isReady) { return <h3>Loading...</h3> }

  return (
    <>
      <Head>
        <title>Pacientes</title>
      </Head>
      <div className="mb-2">
        <h1 className="text-2xl">Pacientes</h1>
      </div>
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
    pacients: data.sort((a: Pacient, b: Pacient) => a.id - b.id),
  }
}

export default ListPacients