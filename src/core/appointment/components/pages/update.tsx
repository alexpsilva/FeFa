import Logger from "../../../../infra/log";
import JSXWithSlots from "../../../../infra/render/jsx/jsx_with_slots";
import Button from "../../../../shared/components/button";
import CrossIcon from "../../../../shared/components/icons/cross";
import SaveIcon from "../../../../shared/components/icons/save";
import TrashIcon from "../../../../shared/components/icons/trash";
import Loading from "../../../../shared/components/loading";
import LoggedInPage from "../../../../shared/components/logged_in_page";
import { Pacient } from "../../../pacient/type";
import { Appointment } from "../../type";
import AppointmentFieldset from "../fieldset";

export default class UpdateAppointmentPage extends JSXWithSlots {
    constructor(
        protected logger: Logger,
        private readonly getAppointment: () => Promise<Appointment & {pacient: Pacient}>
    ) {
        super(logger);
    }

    protected slots = [
        { 
            loading: <Loading/>,
            error: <b>Error</b>,
            content: this.content.bind(this),
        }
    ];

    protected shell(appointmentFormSlot: JSX.Element): JSX.Element {
        return <LoggedInPage title="Editar Consulta" className="flex-column flex-items-center gap-md">
            <h2 className="flex-self-start">Editar Consulta</h2>
            {appointmentFormSlot}
        </LoggedInPage>
    }

    protected async content() {
        const appointment = await this.getAppointment();
        return <form
            hx-put={`/appointment/${appointment.id}`} // to-do Add a indicator that the request is being processed (and disable the submit button)
            className="content-wrapper card-lg flex-column"
        >
            <AppointmentFieldset appointment={appointment}/>
            <div className="flex-row">
                {/* to-do: Alert before deleting */}
                <Button 
                    htmlTag="button" 
                    className="content-faded" 
                    hx-delete={`/appointment/${appointment.id}`} hx-params="none" // to-do Add a indicator that the request is being processed (and disable the submit button)
                >
                    <TrashIcon width="1rem" height="1rem"/>
                    Deletar
                </Button>
                <div className="flex-grow"/>
                <Button htmlTag="button" type="submit">
                    <SaveIcon width="1rem" height="1rem"/>
                    Salvar
                </Button>
                <Button htmlTag="a" href={`/pacient/${appointment.pacientId}`}>
                    <CrossIcon width="1rem" height="1rem"/>
                    Cancelar
                </Button>
            </div>
        </form>
    }
}
