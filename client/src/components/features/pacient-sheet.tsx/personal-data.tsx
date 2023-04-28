import ModelDateInput from "@/components/model/date-input";
import ModelTextInput from "@/components/model/text-input";
import dateDifference from "@/utils/date/date-difference";
import { usePacientSheetContext } from "./context";

export default function PacientSheetPersonalData() {
  const { pacient, setPacient } = usePacientSheetContext()

  const birthday = pacient.birthday ? new Date(pacient.birthday) : null
  const age = birthday ? dateDifference(birthday, new Date(), 'years') : null

  return (
    <div>
      <div className="flex">
        <div>
          <label>
            Nome: <ModelTextInput model={pacient} field='name' setValue={setPacient} />
          </label>
          <label>CPF: <ModelTextInput model={pacient} field='cpf' setValue={setPacient} /> </label>
        </div>
        <div className="ml-auto">
          <label className="block">
            Nascimento: <ModelDateInput model={pacient} field='birthday' setValue={setPacient} />
          </label>
          {age && age > 0
            ? <a className="block text-center text-slate-500">({age} anos)</a>
            : null
          }
        </div>
      </div>
    </div>
  )
}