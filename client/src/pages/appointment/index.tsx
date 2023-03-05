import SimpleTable, { SimpleColumnSpecification } from "@/components/tables/simple-table"
import byId from "@/types/byId"
import Appointment from "@/types/model/appointment"
import Pacient from "@/types/model/pacient"
import fetchAPI from "@/utils/fetch-api"
import stringifyDate from "@/utils/stringify-date"
import { NextPage } from "next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"

interface Row extends Appointment {
  pacientName: string
}

const columns: SimpleColumnSpecification<Row>[] = [
  { title: 'Id', key: 'id' },
  { title: 'Pacient', key: 'pacientName' },
  { title: 'Date', key: 'date', stringify: stringifyDate },
]

type Props = { appointments: Appointment[], pacients: byId<Pacient> }
const ListAppointments: NextPage<Props> = ({ appointments, pacients }) => {
  const router = useRouter()
  if (!router.isReady) { return <h3>Loading...</h3> }

  const data: Row[] = appointments.map(appointment => ({
    ...appointment,
    pacientName: pacients[String(appointment.pacientId)].name
  }))

  return (
    <>
      <Head>
        <title>Appointments</title>
      </Head>
      <h1>Appointments</h1>
      <SimpleTable
        columns={columns}
        data={data}
        onClick={appointment => router.push(`/appointment/${appointment.id}`)}
      />
      <Link href='/appointment/create'>Adicionar</Link>
    </>
  )
}

ListAppointments.getInitialProps = async () => {
  const [appointments, appointmentsError] = await fetchAPI('/appointments', { method: 'GET' })
  if (appointmentsError) { throw new Error(appointmentsError) }

  const [pacients, pacientsError] = await fetchAPI('/pacients', { method: 'GET' })
  if (pacientsError) { throw new Error(pacientsError) }

  const pacientsById: byId<Pacient> = {}
  pacients.forEach((pacient: Pacient) => { pacientsById[pacient.id] = pacient });

  return {
    appointments: appointments.sort((a: Appointment, b: Appointment) => a.id - b.id),
    pacients: pacientsById,
  }
}

export default ListAppointments