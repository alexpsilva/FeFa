import Logger from "../../../../infra/log";
import JSXWithSlots from "../../../../infra/render/jsx/jsx_with_slots";
import Button from "../../../../shared/components/button";
import CrossIcon from "../../../../shared/components/icons/cross";
import TrashIcon from "../../../../shared/components/icons/trash";
import Loading from "../../../../shared/components/loading";
import LoggedInPage from "../../../../shared/components/logged_in_page";
import { Pacient } from "../../type";
import PacientFieldset from "../pacient_fieldset";

export default class UpdatePacientPage extends JSXWithSlots {
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

    protected shell(pacientFormSlot: JSX.Element): JSX.Element {
        return <LoggedInPage title="Editar Paciente" className="flex-column flex-items-center gap-md">
            {pacientFormSlot}
        </LoggedInPage>
    }

    protected async content() {
        const pacient = await this.getPacient();
        return <form
            action={`/pacient/${pacient.id}/edit`}
            method="post"
            className="content-wrapper card-lg flex-column"
        >
            <PacientFieldset pacient={pacient}/>
            <div className="flex-row">
                {/* to-do: Alert before deleting */}
                <Button htmlTag="a" href={`/pacient/${pacient.id}/delete`} className="content-faded">
                    <TrashIcon width="1rem" height="1rem"/>
                    Deletar
                </Button>
                <div className="flex-grow"/>
                <Button htmlTag="button" type="submit">
                    {/* to-do: Add Icon */}
                    Salvar
                </Button>
                <Button htmlTag="a" href={`/pacient/${pacient.id}`}>
                    <CrossIcon width="1rem" height="1rem"/>
                    Cancelar
                </Button>
            </div>
        </form>
    }
}
