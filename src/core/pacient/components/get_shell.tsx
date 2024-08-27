import LoggedInPage from "../../../shared/components/logged_in_page";

export default function GetPacientShell() {
    return (
        <LoggedInPage title="Paciente">
            <main>
                <a href="/pacient">Voltar</a>
                <div id="pacient"></div>
            </main>
        </LoggedInPage>
    )
}