import LoggedInPage from "../../../shared/components/logged_in_page";

export default function ListPacientsShell() {
    return (
        <LoggedInPage title="Pacientes">
            <main>
                <h2>Pacientes</h2>
                <div id="pacient-list"></div>
                <a href="/pacient/new">+ Novo Paciente</a>
            </main>
        </LoggedInPage>
    )
}