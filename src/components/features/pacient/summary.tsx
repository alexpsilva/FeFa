import Stacked from "@/components/layout/stacked"
import DateInput from "@/components/ui/input/date"
import Input from "@/components/ui/input/input"
import Label from "@/components/ui/label"
import Pacient from "@/types/model/pacient"

type Props = {
  readOnly?: boolean
} & Pick<Partial<Pacient>, 'name' | 'birthday' | 'note'>

const PacientSummary = ({ name, birthday, note, readOnly }: Props) => {
  return (
    <>
      <Stacked>
        <Label htmlFor="name">Nome</Label>
        <Input
          name="name"
          defaultValue={name}
          readOnly={readOnly}
          required
        />
      </Stacked>
      <Stacked>
        <Label htmlFor="birthday">Data de nascimento</Label>
        <DateInput
          name="birthday"
          className="w-[13ch]"
          defaultValue={birthday}
          readOnly={readOnly}
          required
        />
      </Stacked>
      <Stacked className="col-span-2">
        <Label htmlFor="note">Nota</Label>
        <Input
          name="note"
          defaultValue={note ?? undefined}
          readOnly={readOnly}
        />
      </Stacked>
    </>
  )
}

export default PacientSummary