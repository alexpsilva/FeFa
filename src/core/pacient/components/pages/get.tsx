import LoggedInPage from "../../../../shared/components/logged_in_page";
import { Pacient } from "../../type";
import PacientForm from "../pacient_form";

function GetPacientPageShell() {
    return (
        <LoggedInPage title="Paciente">
            <a href="/pacient">Voltar</a>
            <div id="pacient"></div>
        </LoggedInPage>
    )
}

function GetPacientPageContent(pacient: Pacient, streamTo: string) {
    return (
        <PacientForm 
            pacient={pacient} 
            stream-to={streamTo} 
            action={`/pacient/${pacient.id}`}
            method="post"
        >
            <button type="submit">Salvar</button>
            <button type="reset">Cancelar</button>
        </PacientForm>
    )
}

export { GetPacientPageShell, GetPacientPageContent }