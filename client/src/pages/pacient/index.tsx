import RedirectTable from "@/components/tables/redirect-table"
import Pacient from "@/types/model/pacient"
import fetchAPI from "@/utils/fetch-api"
import stringifyDate from "@/utils/stringify-date"
import Head from "next/head"
import Link from "next/link"


export default function ListPacients() {
  const PacientTable = () => RedirectTable<Pacient>({
    fields: [
      { title: 'Id', key: 'id' },
      { title: 'Name', key: 'name' },
      { title: 'Nascimento', key: 'birthday', stringify: stringifyDate },
      { title: 'Updated', key: 'updatedAt', stringify: stringifyDate },
      { title: 'Created', key: 'createdAt', stringify: stringifyDate },
    ],
    listItems: async () => (await fetchAPI('/pacients', { method: 'GET' }))[0],
    redirectPath: (pacientId: string) => `/pacient/${pacientId}`,
    inlineActions: [
      {
        label: 'Delete',
        onClick: async (pacientId) => (await fetchAPI(
          `/pacients/${pacientId}`,
          { method: 'DELETE' }
        ))[0],
      },
    ]
  })

  return (
    <>
      <Head>
        <title>Pacients</title>
      </Head>
      <h1>Pacients</h1>
      <PacientTable />
      <Link href='/pacient/create'>Adicionar</Link>
    </>
  )
}