import Logger from "../../../../infra/log";
import JSXWithSlots from "../../../../infra/render/jsx/jsx_with_slots";
import Button from "../../../../shared/components/button";
import ArrowIcon from "../../../../shared/components/icons/arrow";
import PenIcon from "../../../../shared/components/icons/pen";
import Loading from "../../../../shared/components/loading";
import LoggedInPage from "../../../../shared/components/logged_in_page";
import { Pacient } from "../../type";
import PacientFieldset from "../pacient_fieldset";

export default class GetPacientPage extends JSXWithSlots {
    constructor(
        protected logger: Logger,
        private readonly getPacient: () => Promise<Pacient>
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

    protected shell(pacientDataSlot: JSX.Element): JSX.Element {
        return <LoggedInPage title="Paciente" className="flex-column flex-items-center gap-md">
            <Button htmlTag="a" href="/pacient" className="flex-self-start">
                <ArrowIcon direction="left" width="1.5rem" height="1.5rem"/>
                <span>Voltar</span>
            </Button>
            {pacientDataSlot}
        </LoggedInPage>
    }

    protected async content() {
        const pacient = await this.getPacient();
        return <div className="content-wrapper card-lg flex-column">
            <PacientFieldset 
                pacient={pacient} 
                disabled
            />
            <Button htmlTag="a" href={`/pacient/${pacient.id}/edit`} className="flex-self-end">
                <PenIcon width="1rem" height="1rem"/>
                Editar
            </Button>
        </div>
    }
}
