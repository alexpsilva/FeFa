import Stacked from "@/components/layout/stacked"
import CpfInput from "@/components/ui/input/cpf"
import Input from "@/components/ui/input/input"
import Label from "@/components/ui/label"
import Pacient from "@/types/model/pacient"
import PhoneList from "./phoneList"

type Props = {
  readOnly?: boolean
} & Pick<Partial<Pacient>, 'cpf' | 'address' | 'phones'>

const PacientDetails = ({ cpf, address, phones, readOnly }: Props) => {
  return (
    <>
      <Stacked>
        <Label htmlFor="cpf">CPF</Label>
        <CpfInput
          name="cpf"
          defaultValue={cpf ?? undefined}
          className="w-[13ch]"
          readOnly={readOnly}
        />
      </Stacked>
      <Stacked>
        <Label htmlFor="address">Endereço</Label>
        <Input
          name="address"
          defaultValue={address ?? undefined}
          readOnly={readOnly}
        />
      </Stacked>
      <PhoneList
        className="row-start-3 col-start-2 row-span-3 "
        readOnly={readOnly}
      />
    </>
  )
}

export default PacientDetails