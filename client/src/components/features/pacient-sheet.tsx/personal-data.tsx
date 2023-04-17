import Table from "@/components/layout/table/table";
import ModelDateInput from "@/components/model/date-input";
import ModelTextInput from "@/components/model/text-input";
import { Phone } from "@/types/model/pacient";
import deleteFromArray from "@/utils/delete-from-array";
import updateArray from "@/utils/update-array";
import { usePacientSheetContext } from "./context";

export default function PacientSheetPersonalData() {
  const { pacient, setPacient } = usePacientSheetContext()

  const onChangeHandler = (row: number, col: keyof Phone, newValue: any) => {
    setPacient({
      ...pacient, phones: updateArray(
        pacient.phones || [],
        (_, i) => i == row,
        newValue
      )
    })
  }

  const onDeleteHandler = (row: number) => {
    setPacient({
      ...pacient, phones: deleteFromArray(
        pacient.phones || [],
        (_, i) => i == row,
      )
    })
  }

  return (
    <div>
      <label> CPF: <ModelTextInput model={pacient} field='cpf' setValue={setPacient} /> </label>
      <label> Nascimento: <ModelDateInput model={pacient} field='birthday' setValue={setPacient} /> </label>
      <label> Phones:
        <Table
          columns={[
            { header: 'Label', id: 'label', isEditable: true },
            { header: 'Number', id: 'number', isEditable: true },
          ]}
          data={pacient.phones || []}
          onCell={{ change: onChangeHandler }}
          inlineActions={<Table.InlineButton text='Deletar' onClick={onDeleteHandler} />}
        />
      </label>
    </div>
  )
}