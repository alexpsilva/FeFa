import EditableTable from "@/components/crud-table"
import TypeFieldSpecification from "@/components/editable-table/types/field"
import Insurance from "@/types/insurance"
import stringifyDate from "@/utils/stringify-date"
import Head from "next/head"
import { createInsurance, deleteInsurance, listInsurances, updateInsurance } from "./api"

const InsuranceTable = EditableTable<Insurance>
const insuranceFields: TypeFieldSpecification<Insurance>[] = [
  { title: 'Id', key: 'id', isComputed: true },
  { title: 'Name', key: 'name', isEditable: true },
  { title: 'Updated', key: 'updatedAt', isComputed: true, stringify: stringifyDate },
  { title: 'Created', key: 'createdAt', isComputed: true, stringify: stringifyDate },
]

export default function ListInsurances() {
  return (
    <>
      <Head>
        <title>Insurances</title>
      </Head>
      <h1>Insurances</h1>
      <InsuranceTable
        fields={insuranceFields}
        listItems={listInsurances}
        createItem={createInsurance}
        updateItem={updateInsurance}
        deleteItem={deleteInsurance}
      />
    </>
  )
}