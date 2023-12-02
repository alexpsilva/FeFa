import Stacked from "@/components/layout/stacked"
import DateInput from "@/components/ui/input/date"
import Input from "@/components/ui/input"
import Label from "@/components/ui/label"
import Pacient from "@/types/model/pacient"
import TextArea from "@/components/ui/textarea"

type Props = {
  readOnly?: boolean
} & Pick<Partial<Pacient>, 'name' | 'birthday' | 'note'>

const PacientSummary = ({ name, birthday, note, readOnly }: Props) => {
  return (
    <>
      <Stacked className="col-start-1 row-start-1">
        <Label htmlFor="name">Nome</Label>
        <Input
          name="name"
          defaultValue={name}
          readOnly={readOnly}
          required
        />
      </Stacked>
      <Stacked className="col-start-2 row-start-1">
        <Label htmlFor="birthday">Data de nascimento</Label>
        <DateInput
          name="birthday"
          className="w-[13ch]"
          defaultValue={birthday}
          readOnly={readOnly}
          required
        />
      </Stacked>
      <Stacked className="col-start-1 col-span-2 row-start-2">
        <Label htmlFor="note">Nota</Label>
        <TextArea
          name="note"
          defaultValue={note ?? undefined}
          readOnly={readOnly}
        />
      </Stacked>
    </>
  )
}

export default PacientSummary