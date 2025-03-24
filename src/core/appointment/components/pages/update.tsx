import Logger from "../../../../infra/log";
import JSXWithSlots from "../../../../infra/render/jsx/jsx_with_slots";
import Anchor from "../../../../shared/components/anchor";
import Button from "../../../../shared/components/button";
import CrossIcon from "../../../../shared/components/icons/cross";
import SaveIcon from "../../../../shared/components/icons/save";
import Spinner from "../../../../shared/components/icons/spinner";
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
            hx-put={`/appointment/${appointment.id}`}
            hx-disabled-elt="find button[type=submit]"
            hx-indicator="button[type=submit]"
            className="content-wrapper card-lg flex-column"
        >
            <AppointmentFieldset appointment={appointment}/>
            <div className="flex-row">
                {/* to-do: Alert before deleting */}
                <Button 
                    className="content-alert" 
                    hx-delete={`/appointment/${appointment.id}`}
                    hx-params="none"
                    hx-disabled-elt="this"
                    hx-indicator="this"
                    overlay={<Spinner width="1rem" height="1rem" className="htmx-indicator"/>}
                >
                    <TrashIcon width="1rem" height="1rem"/>
                    Deletar
                </Button>
                <div className="flex-grow"/>
                <Button 
                    type="submit"
                    overlay={<Spinner width="1rem" height="1rem" className="htmx-indicator"/>}
                >
                    <SaveIcon width="1rem" height="1rem"/>
                    Salvar
                </Button>
                <Anchor href={`/pacient/${appointment.pacientId}`}>
                    <CrossIcon width="1rem" height="1rem"/>
                    Cancelar
                </Anchor>
            </div>
        </form>
    }
}
