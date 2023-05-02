import Table from "@/components/layout/table/table";
import ModelTextInput from "@/components/model/text-input";
import { Phone } from "@/types/model/pacient";
import { updateArray, deleteFromArray } from "@/utils/array";
import { usePacientSheetContext } from "./context";

export default function PacientSheetContact() {
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
      <label>Rua <ModelTextInput model={pacient} field='address' setValue={setPacient} /></label>
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