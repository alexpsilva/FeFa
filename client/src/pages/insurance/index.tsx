import ColumnSpecification from "@/components/editable-table/types/column"
import Insurance from "@/types/model/insurance"
import stringifyDate from "@/utils/stringify-date"
import Head from "next/head"
import { createInsurance, deleteInsurance, listInsurances, updateInsurance } from "./api"
import EditableTable from "@/components/editable-table"

const insuranceFields: ColumnSpecification<Insurance>[] = [
  { title: 'Id', key: 'id' },
  { title: 'Name', key: 'name', isEditable: true },
  { title: 'Updated', key: 'updatedAt', stringify: stringifyDate },
  { title: 'Created', key: 'createdAt', stringify: stringifyDate },
]

export default function ListInsurances() {
  return (
    <>
      <Head>
        <title>Insurances</title>
      </Head>
      <h1>Insurances</h1>
      <EditableTable
        columns={insuranceFields}
        listItems={listInsurances}
      />
    </>
  )
}