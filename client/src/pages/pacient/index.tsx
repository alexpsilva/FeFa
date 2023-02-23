import RedirectTable from "@/components/redirect-table"
import Pacient from "@/types/pacient"
import stringifyDate from "@/utils/stringify-date"
import Head from "next/head"
import Link from "next/link"
import { deletePacient, listPacients } from "./api"


export default function ListPacients() {
  const PacientTable = () => RedirectTable<Pacient>({
    fields: [
      { title: 'Id', key: 'id' },
      { title: 'Name', key: 'name' },
      { title: 'Updated', key: 'updatedAt', stringify: stringifyDate },
      { title: 'Created', key: 'createdAt', stringify: stringifyDate },
    ],
    listItems: listPacients,
    redirectPath: (itemId: string) => `/pacient/${itemId}`,
    inlineActions: [
      { label: 'Delete', onClick: (itemId) => deletePacient(itemId) }
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