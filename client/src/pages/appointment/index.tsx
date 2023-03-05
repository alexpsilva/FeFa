import RedirectTable from "@/components/redirect-table"
import Appointment from "@/types/model/appointment"
import fetchAPI from "@/utils/fetch-api"
import stringifyDate from "@/utils/stringify-date"
import Head from "next/head"
import Link from "next/link"


export default function ListAppointments() {
  const AppointmentTable = () => RedirectTable<Appointment>({
    fields: [
      { title: 'Id', key: 'id' },
      // { title: 'appointment', key: 'name' },
      { title: 'Date', key: 'date', stringify: stringifyDate },
    ],
    listItems: async () => (await fetchAPI('/appointments', { method: 'GET' }))[0],
    redirectPath: (appointmentId: string) => `/appointment/${appointmentId}`,
    inlineActions: [
      {
        label: 'Delete',
        onClick: async (appointmentId) => (await fetchAPI(
          `/appointments/${appointmentId}`,
          { method: 'DELETE' }
        ))[0],
      },
    ]
  })

  return (
    <>
      <Head>
        <title>Appointments</title>
      </Head>
      <h1>Appointments</h1>
      <AppointmentTable />
      <Link href='/appointment/create'>Adicionar</Link>
    </>
  )
}