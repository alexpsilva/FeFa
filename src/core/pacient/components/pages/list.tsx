import JSXWithSlots from "../../../../infra/render/jsx/jsx_with_slots";
import LoggedInPage from "../../../../shared/components/logged_in_page";
import { Pacient } from "../../type";

export default class ListPacientsPage extends JSXWithSlots {
    constructor(private readonly getPacients: () => Promise<Pacient[]>) {
        super();
    }

    protected slots = [
        {
            loading: <p>Loading...</p>,
            error: <b>Error</b>,
            content: this.content.bind(this),
        }
    ];

    protected shell(pacientListSlot: JSX.Element): JSX.Element {
        return <LoggedInPage title="Pacientes">
            <h2>Pacientes</h2>
            {pacientListSlot}
            <a href="/pacient/new">+ Novo Paciente</a>
        </LoggedInPage>
    }

    protected async content() {
        const pacients = await this.getPacients();
        return <ul>
            {pacients.map(pacient => (
                <li key={pacient.id}>
                    <a href={`/pacient/${pacient.id}`}>{pacient.name}</a>
                </li>
            ))}
        </ul>
    }
}