import DateInput from "@/components/ui/date-input";
import Input from "@/components/ui/input";
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
            Nome: <Input value={pacient.name} onChange={(name) => setPacient({ ...pacient, name })} />
          </label>
          <label>CPF: <Input value={pacient.cpf ?? ''} onChange={(cpf) => setPacient({ ...pacient, cpf })} /> </label>
        </div>
        <div className="ml-auto">
          <label className="block">
            Nascimento: <DateInput
              value={pacient.birthday}
              onChange={(birthday) => setPacient({ ...pacient, birthday })}
            />
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