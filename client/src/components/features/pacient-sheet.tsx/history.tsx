import Table from "@/components/layout/table/table"
import stringifyDate from "@/utils/date/stringify-date"
import { useRouter } from "next/router"
import { usePacientSheetContext } from "./context"

export default function PacientSheetHistory() {
  const { appointments } = usePacientSheetContext()
  const router = useRouter()

  return (
    <div className="m-2">
      <h3>Appointments</h3>
      <Table
        columns={[
          { header: 'Data', id: 'date', format: stringifyDate },
          { header: 'Resumo', id: 'description' },
        ]}
        data={appointments || []}
        onRow={{ click: row => router.push(`/appointment/${appointments![row].id}`) }}
      />
    </div>
  )
}