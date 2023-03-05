import Appointment from "@/types/model/appointment"
import Pacient from "@/types/model/pacient"
import ModelDateInput from "../model-date-input"
import ModelFKDropdown from "../model-fk-dropdown"
import ModelTextArea from "../model-text-area"

interface Props {
  pacients: Pacient[]
  appointment: Partial<Appointment>
  setAppointment: (newAppointment: Partial<Appointment>) => void
}

const AppointmentSheet = ({ pacients, appointment, setAppointment }: Props) => {
  return (
    <div>
      <ModelFKDropdown
        model={appointment}
        field='pacientId'
        setValue={setAppointment}
        options={pacients.map(pacient => ({ label: pacient.name, id: pacient.id }))}
      />
      <ModelDateInput model={appointment} field='date' setValue={setAppointment} />
      <ModelTextArea model={appointment} field='description' setValue={setAppointment} />
    </div>
  )
}

export default AppointmentSheet