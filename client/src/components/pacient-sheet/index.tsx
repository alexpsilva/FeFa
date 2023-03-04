import ModelTextInput from "@/components/model-text-input"
import MultitabFrame from "@/components/multitab-frame"
import TabItem from "@/components/multitab-frame/tab-item"
import useInlineImediateDelete from "@/hooks/useInlineImediateDelete"
import Pacient, { Phone } from "@/types/model/pacient"
import EditableTable from "../editable-table"
import ColumnSpecification from "../editable-table/types/column"

interface Props {
  data: Partial<Pacient>
  setData: (newData: Partial<Pacient>) => void
}

function PacientSheet(
  { data, setData }: Props
) {
  const phoneColumns: ColumnSpecification<Phone>[] = [
    { key: 'label', title: 'Label', isEditable: true },
    { key: 'number', title: 'Number', isEditable: true },
  ]

  const phonesInlineDelete = useInlineImediateDelete(
    data.phones || [],
    (newPhones) => setData({ ...data, phones: newPhones })
  )

  return (
    <div>
      <ModelTextInput model={data} field={'name'} setValue={setData} />
      <MultitabFrame>
        <TabItem tabName="History">
          <h3>First tab!</h3>
        </TabItem>
        <TabItem tabName="Personal">
          <label> CPF: <ModelTextInput model={data} field={'cpf'} setValue={setData} /> </label>
          <label> Phones:
            <EditableTable
              columns={phoneColumns}
              data={data.phones || []}
              setData={(phones) => setData({ ...data, phones: phones } as Partial<Pacient>)}
              inlineActions={[phonesInlineDelete]}
            />
          </label>
        </TabItem>
        <TabItem tabName="Contact">
          <label>Rua <ModelTextInput model={data} field={'addressStreet'} setValue={setData} /></label>
        </TabItem>
      </MultitabFrame>
    </div>
  )
}

export default PacientSheet