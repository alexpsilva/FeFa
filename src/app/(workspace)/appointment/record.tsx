import DateInput from "@/components/ui/input/date";
import Input from "@/components/ui/input/input";

interface Props {
  description?: string
  date?: Date
}

const MedicalRecord = ({ description, date }: Props) => {
  return (
    <div>
      <DateInput name="date" defaultValue={date} />
      <div className="ml-auto">
        <Input name="description" defaultValue={description} />
      </div>
    </div>
  )
}

export default MedicalRecord