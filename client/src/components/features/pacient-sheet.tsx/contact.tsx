import ModelTextInput from "@/components/model/text-input";
import { usePacientSheetContext } from "./context";

export default function PacientSheetContact() {
  const { pacient, setPacient } = usePacientSheetContext()

  return (
    <div>
      <label>Rua <ModelTextInput model={pacient} field='address' setValue={setPacient} /></label>
    </div>
  )
}