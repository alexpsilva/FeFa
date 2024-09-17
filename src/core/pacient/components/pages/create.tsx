import Anchor from "../../../../shared/components/anchor";
import Button from "../../../../shared/components/button";
import CrossIcon from "../../../../shared/components/icons/cross";
import SaveIcon from "../../../../shared/components/icons/save";
import Spinner from "../../../../shared/components/icons/spinner";
import LoggedInPage from "../../../../shared/components/logged_in_page";
import PacientFieldset from "../fieldset";

export default function CreatePacientPage() {
    return (
        <LoggedInPage title="Criar Paciente" className="flex-column flex-items-center gap-md">
            <h2 className="flex-self-start">Criar Paciente</h2>
            <form 
                hx-post={`/pacient/new`} 
                hx-disabled-elt="find button[type=submit]"
                hx-indicator="button[type=submit]"
                className="content-wrapper card-lg flex-column"
            >
                <PacientFieldset/>
                <div className="flex-row">
                    <div className="flex-grow"/>
                    <Button 
                        type="submit"
                        overlay={<Spinner width="1rem" height="1rem" className="htmx-indicator"/>}
                    >
                        <SaveIcon width="1rem" height="1rem"/>
                        Salvar
                    </Button>
                    <Anchor href="/pacient">
                        <CrossIcon width="1rem" height="1rem"/>
                        Cancelar
                    </Anchor>
                </div>
            </form>
        </LoggedInPage>
    )
}