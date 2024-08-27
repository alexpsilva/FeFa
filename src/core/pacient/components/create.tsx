import LoggedInPage from "../../../shared/components/logged_in_page";

export default function CreatePacient() {
    return (
        <LoggedInPage title="Criar Paciente">
            <main>
                <h2>Criar Paciente</h2>
                <form action="/pacient/new" method="post">
                    <label>Nome <input name="name" type="text"/></label>
                    <label>CPF <input name="cpf" type="text"/></label>
                    <label>Data de Nascimento <input name="birthday" type="date"/></label>
                    <label>Endereço <input name="address" type="text"/></label>

                    <button type="submit">Salvar</button>
                    {/* <a href="/pacient">Cancelar</a> */}
                </form>
            </main>
        </LoggedInPage>
    )
}