import { Pacient } from "../../pacient/type";
import { Appointment } from "../type";

export default function AppointmentFieldset({appointment, ...props}: React.ComponentProps<'fieldset'> & {
    appointment: Partial<Appointment> & {pacient: Pacient}
}) {
    return (
        <fieldset className="padding-lg grid-flow-row grid-cols-2 gap-md" {...props}>
            <input name="pacient_id" type="text" value={appointment.pacient.id} readOnly className="hidden"/>
            <div className="flex-column">
                <label className="content-faded text-sm">Paciente</label>
                <span>{appointment.pacient.name}</span>
            </div>

            <div className="flex-column">
                <label htmlFor="date" className="content-faded text-sm">Data</label>
                <input id="date" name="date" type="date" defaultValue={appointment?.date?.toISOString().split('T')[0]}/>
            </div>

            <div className="flex-column">
                <label htmlFor="description" className="content-faded text-sm">Descrição</label>
                <input id="description" name="description" type="text" defaultValue={appointment?.description}/>
            </div>
        </fieldset>
    )
}