import ModelTextInput from "@/components/model/model-text-input"
import MultitabFrame from "@/components/layout/multitab-frame"
import TabItem from "@/components/layout/multitab-frame/tab-item"
import useInlineImediateDelete from "@/hooks/useInlineImediateDelete"
import Pacient, { Phone } from "@/types/model/pacient"
import EditableTable from "@/components/tables/editable-table"
import ColumnSpecification from "@/components/tables/editable-table/types/column"
import ModelDateInput from "@/components/model/model-date-input"

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
      <ModelTextInput model={data} field='name' setValue={setData} />
      <MultitabFrame>
        <TabItem tabName="History">
          <h3>First tab!</h3>
        </TabItem>
        <TabItem tabName="Personal">
          <label> CPF: <ModelTextInput model={data} field='cpf' setValue={setData} /> </label>
          <label> Nascimento: <ModelDateInput model={data} field='birthday' setValue={setData} /> </label>
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
          <label>Rua <ModelTextInput model={data} field='address' setValue={setData} /></label>
        </TabItem>
      </MultitabFrame>
    </div>
  )
}

export default PacientSheet