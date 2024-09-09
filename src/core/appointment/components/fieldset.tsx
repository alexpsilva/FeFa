import { Appointment } from "../type";

export default function AppointmentFieldset({appointment, ...props}: React.ComponentProps<'fieldset'> & {
    appointment?: Partial<Appointment>
}) {
    return (
        <fieldset className="padding-lg grid-flow-row grid-cols-2 gap-md" {...props}>
            {/* to-do: Use pacient name (read-only) but make sure that the pacient_id is also included in the form request */}
            <div className="flex-column">
                <label htmlFor="pacient_id" className="content-faded text-sm">Paciente</label>
                <input id="pacient_id" name="pacient_id" type="text" defaultValue={appointment?.pacientId}/>
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