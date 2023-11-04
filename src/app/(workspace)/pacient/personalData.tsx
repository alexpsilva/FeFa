import DateInput from "@/components/ui/input/date";
import Input from "@/components/ui/input/input";
import dateDifference from "@/utils/date/date-difference";

interface Props {
  name: string
  cpf?: string | null
  birthday: Date
}

export default function PacientPersonalData({
  name, cpf, birthday
}: Props) {
  const age = birthday ? dateDifference(birthday, new Date(), 'years') : null

  return (
    <div className="flex">
      <div>
        <label htmlFor="cpf">CPF: </label>
        <Input name="cpf" defaultValue={cpf ?? ''} />
        <label htmlFor="birthday"> Data de nascimento: </label>
        <DateInput name="birthday" defaultValue={birthday} />
        {age && age > 0
          ? <a className="block text-center text-slate-500">({age} anos)</a>
          : null
        }
      </div>
    </div>
  )
}