import ModelTextInput from "@/components/model/model-text-input"
import MultitabFrame from "@/components/layout/multitab-frame"
import TabItem from "@/components/layout/multitab-frame/tab-item"
import useInlineImediateDelete from "@/hooks/useInlineImediateDelete"
import Pacient, { Phone } from "@/types/model/pacient"
import EditableTable, { EditableColumnSpecification } from "@/components/layout/editable-table"
import ModelDateInput from "@/components/model/model-date-input"
import Appointment from "@/types/model/appointment"
import SimpleTable from "../layout/table/simple-table"
import stringifyDate from "@/utils/stringify-date"
import { useRouter } from "next/router"

interface Props {
  pacient: Partial<Pacient>
  setPacient: (newData: Partial<Pacient>) => void
  appointments?: Appointment[]
}

function PacientSheet(
  { pacient, setPacient, appointments }: Props
) {
  const router = useRouter()

  const phoneColumns: EditableColumnSpecification<Phone>[] = [
    { key: 'label', title: 'Label', isEditable: true },
    { key: 'number', title: 'Number', isEditable: true },
  ]

  const phonesInlineDelete = useInlineImediateDelete(
    pacient.phones || [],
    (newPhones) => setPacient({ ...pacient, phones: newPhones })
  )

  return (
    <div>
      <ModelTextInput model={pacient} field='name' setValue={setPacient} />
      <MultitabFrame>
        <TabItem tabName="History">
          <h3>Appointments</h3>
          <SimpleTable
            columns={[
              { title: 'Date', key: 'date', stringify: stringifyDate },
              { title: 'Summary', key: 'description', stringify: i => `${i.slice(0, 20)}...` },
            ]}
            data={appointments || []}
            onClick={(appointment) => router.push(`/appointment/${appointment.id}`)}
          />
        </TabItem>
        <TabItem tabName="Personal">
          <label> CPF: <ModelTextInput model={pacient} field='cpf' setValue={setPacient} /> </label>
          <label> Nascimento: <ModelDateInput model={pacient} field='birthday' setValue={setPacient} /> </label>
          <label> Phones:
            <EditableTable
              columns={phoneColumns}
              data={pacient.phones || []}
              setData={(phones) => setPacient({ ...pacient, phones: phones } as Partial<Pacient>)}
              inlineActions={[phonesInlineDelete]}
            />
          </label>
        </TabItem>
        <TabItem tabName="Contact">
          <label>Rua <ModelTextInput model={pacient} field='address' setValue={setPacient} /></label>
        </TabItem>
      </MultitabFrame>
    </div>
  )
}

export default PacientSheet