import Button from "../../../../shared/components/button";
import CrossIcon from "../../../../shared/components/icons/cross";
import SaveIcon from "../../../../shared/components/icons/save";
import LoggedInPage from "../../../../shared/components/logged_in_page";
import AppointmentFieldset from "../fieldset";

export default function CreateAppointmentPage(pacientId: number) {
    return (
        <LoggedInPage title="Criar Consulta" className="flex-column flex-items-center gap-md">
            <h2 className="flex-self-start">Criar Consulta</h2>
            <form action="/appointment/new" method="post" className="content-wrapper card-lg flex-column">
                <AppointmentFieldset appointment={{pacientId}}/>
                <div className="flex-row">
                    <div className="flex-grow"/>
                    <Button htmlTag="button" type="submit">
                        <SaveIcon width="1rem" height="1rem"/>
                        Salvar
                    </Button>
                    <Button htmlTag="a" href={`/pacient/${pacientId}`}>
                        <CrossIcon width="1rem" height="1rem"/>
                        Cancelar
                    </Button>
                </div>
            </form>
        </LoggedInPage>
    )
}