import ColumnSpecification from "@/components/editable-table/types/column"
import Insurance from "@/types/model/insurance"
import stringifyDate from "@/utils/stringify-date"
import Head from "next/head"
import EditableTable from "@/components/editable-table"
import fetchAPI from "@/utils/fetch-api"
import requestExpenseAPI from "@/utils/fetch-expense-api"
import { NextPage } from "next/types"

const insuranceFields: ColumnSpecification<Insurance>[] = [
  { title: 'Id', key: 'id' },
  { title: 'Name', key: 'name', isEditable: true },
  { title: 'Updated', key: 'updatedAt', stringify: stringifyDate },
  { title: 'Created', key: 'createdAt', stringify: stringifyDate },
]

const onSave = async (
  creating: Partial<Insurance>[],
  deleting: Insurance['id'][],
  updating: Insurance[]
): Promise<Insurance[]> => requestExpenseAPI('/insurances/batch', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    create: creating,
    update: updating,
    delete: deleting,
  }),
})

type Props = { data?: Insurance[], error?: string }
const ListInsurances: NextPage<Props> = ({ data, error }) => {
  if (error) { return <h3>Error: {error}</h3> }
  if (!data) { return <h3>Loading...</h3> }

  return (
    <>
      <Head>
        <title>Insurances</title>
      </Head>
      <h1>Insurances</h1>
      <EditableTable
        columns={insuranceFields}
        initialData={data}
        onSave={onSave}
      />
    </>
  )
}

ListInsurances.getInitialProps = async () => {
  const [data, error] = await fetchAPI('/insurances', { method: 'GET' })
  return { data, error }
}

export default ListInsurances