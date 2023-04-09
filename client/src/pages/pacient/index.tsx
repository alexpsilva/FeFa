import SimpleTable, { SimpleColumnSpecification } from "@/components/tables/simple-table"
import Pacient from "@/types/model/pacient"
import fetchAPIWithAuth from "@/utils/fetch-api-with-auth"
import { NextPage } from "next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"

const columns: SimpleColumnSpecification<Pacient>[] = [
  { title: 'Id', key: 'id' },
  { title: 'Name', key: 'name' },
]

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
      <SimpleTable
        columns={columns}
        data={pacients}
        onClick={pacient => router.push(`/pacient/${pacient.id}`)}
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