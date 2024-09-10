import Logger from "../../../../infra/log";
import JSXWithSlots from "../../../../infra/render/jsx/jsx_with_slots";
import Button from "../../../../shared/components/button";
import CrossIcon from "../../../../shared/components/icons/cross";
import SaveIcon from "../../../../shared/components/icons/save";
import Loading from "../../../../shared/components/loading";
import LoggedInPage from "../../../../shared/components/logged_in_page";
import { Pacient } from "../../../pacient/type";
import AppointmentFieldset from "../fieldset";

export default class CreateAppointmentPage extends JSXWithSlots {
    constructor(
        protected logger: Logger,
        private readonly getPacient: () => Promise<Pacient>,
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
        return <LoggedInPage title="Criar Consulta" className="flex-column flex-items-center gap-md">
            <h2 className="flex-self-start">Criar Consulta</h2>
            {appointmentFormSlot}
        </LoggedInPage>
    }

    protected async content() {
        const pacient = await this.getPacient();

        return (
            <form action="/appointment/new" method="post" className="content-wrapper card-lg flex-column">
                <AppointmentFieldset appointment={{ pacient }}/>
                <div className="flex-row">
                    <div className="flex-grow"/>
                    <Button htmlTag="button" type="submit">
                        <SaveIcon width="1rem" height="1rem"/>
                        Salvar
                    </Button>
                    <Button htmlTag="a" href={`/pacient/${pacient.id}`}>
                        <CrossIcon width="1rem" height="1rem"/>
                        Cancelar
                    </Button>
                </div>
            </form>
        )
    }
}