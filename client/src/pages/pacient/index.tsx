import Table from "@/components/layout/table/table"
import Pacient from "@/types/model/pacient"
import fetchAPIWithAuth from "@/utils/fetch-api-with-auth"
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
        <title>Pacients</title>
      </Head>
      <h1>Pacients</h1>
      <Table
        columns={[{ header: 'Nome', id: 'name' }]}
        data={pacients}
        onCell={{ click: index => router.push(`/pacient/${pacients[index].id}`) }}
      />
      <Link href='/pacient/create'>Adicionar</Link>
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