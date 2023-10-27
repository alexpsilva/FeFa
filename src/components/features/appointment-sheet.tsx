import Appointment from "@/types/model/appointment"
import Pacient from "@/types/model/pacient"
import { useState } from "react"
import DateInput from "../ui/date-input"
import Dropdown from "../ui/dropdown"
import StyledTextArea from "../ui/styled-text-area"

interface Props {
  pacients: Pacient[]
  appointment: Partial<Appointment>
  setAppointment: (newAppointment: Partial<Appointment>) => void
}

const AppointmentSheet = ({ pacients, appointment, setAppointment }: Props) => {
  return (
    <div>
      <div className="flex mb-4">
        <Dropdown
          className=""
          value={appointment.pacientId}
          setValue={(pacientId) => setAppointment({ ...appointment, pacientId: Number(pacientId) })}
          options={pacients.map(pacient => ({ label: pacient.name, value: pacient.id }))}
        />
        <DateInput
          className="ml-auto"
          value={appointment.date}
          onChange={(newDate) => setAppointment({ ...appointment, date: newDate })}
        />
      </div>
    </div>
  )
}

export default AppointmentSheet