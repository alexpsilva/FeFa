import LoggedInPage from "../../../../shared/components/logged_in_page";
import { Pacient } from "../../type";

function ListPacientsPageShell() {
    return (
        <LoggedInPage title="Pacientes">
            <h2>Pacientes</h2>
            <div id="pacient-list"></div>
            <a href="/pacient/new">+ Novo Paciente</a>
        </LoggedInPage>
    )
}

function ListPacientsPageContent(pacients: Pacient[], streamTo: string) {
    return (
        <ul stream-to={streamTo}>
            {pacients.map(pacient => (
                <li key={pacient.id}>
                    <a href={`/pacient/${pacient.id}`}>{pacient.name}</a>
                </li>
            ))}
        </ul>
    )
}

export { ListPacientsPageShell, ListPacientsPageContent }