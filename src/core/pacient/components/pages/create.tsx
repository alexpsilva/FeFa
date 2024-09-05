import Button from "../../../../shared/components/button";
import CrossIcon from "../../../../shared/components/icons/cross";
import LoggedInPage from "../../../../shared/components/logged_in_page";
import PacientFieldset from "../pacient_fieldset";

export default function CreatePacientPage() {
    return (
        <LoggedInPage title="Criar Paciente">
            <h2>Criar Paciente</h2>
            <form action="/pacient/new" method="post" className="content-wrapper card-lg flex-column">
                <PacientFieldset/>
                <div className="flex-row">
                    <div className="flex-grow"/>
                    <Button htmlTag="button" type="submit">
                        {/* to-do: Add Icon */}
                        Salvar
                    </Button>
                    <Button htmlTag="a" href="/pacient">
                        <CrossIcon width="1rem" height="1rem"/>
                        Cancelar
                    </Button>
                </div>
            </form>
        </LoggedInPage>
    )
}