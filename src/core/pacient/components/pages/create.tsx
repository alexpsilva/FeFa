import LoggedInPage from "../../../../shared/components/logged_in_page";
import PacientForm from "../pacient_form";

export default function CreatePacientPage() {
    return (
        <LoggedInPage title="Criar Paciente">
            <h2>Criar Paciente</h2>
            <PacientForm action="/pacient/new" method="post">
                <button type="submit">Salvar</button>
                {/* <a href="/pacient">Cancelar</a> */}
            </PacientForm>
        </LoggedInPage>
    )
}