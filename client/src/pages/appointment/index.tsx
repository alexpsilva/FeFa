import Table from "@/components/layout/table/table"
import Appointment from "@/types/model/appointment"
import Pacient from "@/types/model/pacient"
import fetchAPIWithAuth from "@/auth/fetch-api-with-auth"
import stringifyDate from "@/utils/date/stringify-date"
import { NextPage } from "next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"

interface AppointmentWithPacient extends Appointment {
  pacient: Pacient
}

interface Row extends Appointment {
  pacientName: string
}

type Props = { appointments: AppointmentWithPacient[] }
const ListAppointments: NextPage<Props> = ({ appointments }) => {
  const router = useRouter()
  if (!router.isReady) { return <h3>Loading...</h3> }

  const data: Row[] = appointments.map(appointment => ({
    ...appointment,
    pacientName: appointment.pacient.name
  }))

  return (
    <>
      <Head>
        <title>Consultas</title>
      </Head>
      <div className="mb-2">
        <h1 className="text-2xl">Consultas</h1>
      </div>
      <Table
        data={data}
        columns={[
          { header: 'Paciente', id: 'pacientName' },
          { header: 'Data', id: 'date', format: stringifyDate },
        ]}
        onRow={{ click: index => router.push(`/appointment/${appointments[index].id}`) }}
        footer={{ pacientName: <Link href='/appointment/create'>+ Adicionar</Link> }}
      />
    </>
  )
}

ListAppointments.getInitialProps = async (ctx) => {
  const { response: data, error } = await fetchAPIWithAuth('/appointments?includePacient=true', { method: 'GET' }, ctx)
  if (error) { throw new Error(error.message) }

  return {
    appointments: data.sort((a: Appointment, b: Appointment) => a.id - b.id),
  }
}

export default ListAppointments