import JSXWithSlots from "../../../../infra/render/jsx/jsx_with_slots";
import LoggedInPage from "../../../../shared/components/logged_in_page";
import { Pacient } from "../../type";
import PacientForm from "../pacient_form";

export default class GetPacientPage extends JSXWithSlots {
    constructor(private readonly getPacient: () => Promise<Pacient>) {
        super();
    }

    protected slots = [
        { 
            loading: <p>Loading...</p>,
            error: <b>Error</b>,
            content: this.content.bind(this),
        }
    ];

    protected shell(pacientFormSlot: JSX.Element): JSX.Element {
        return <LoggedInPage title="Paciente">
            <a href="/pacient">Voltar</a>
            {pacientFormSlot}
        </LoggedInPage>
    }

    protected async content() {
        const pacient = await this.getPacient();
        return <PacientForm 
            pacient={pacient} 
            action={`/pacient/${pacient.id}`}
            method="post"
        >
            <button type="submit">Salvar</button>
            <button type="reset">Cancelar</button>
        </PacientForm>
    }
}
