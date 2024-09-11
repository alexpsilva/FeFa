import { WithCount } from "../../../../infra/database/repository";
import Logger from "../../../../infra/log";
import JSXWithSlots from "../../../../infra/render/jsx/jsx_with_slots";
import Button from "../../../../shared/components/button";
import ArrowIcon from "../../../../shared/components/icons/arrow";
import PenIcon from "../../../../shared/components/icons/pen";
import Loading from "../../../../shared/components/loading";
import LoggedInPage from "../../../../shared/components/logged_in_page";
import { Appointment } from "../../../appointment/type";
import { Pacient } from "../../type";
import PacientFieldset from "../fieldset";
import PaginationControls from "../../../../shared/components/pagination_controls";

export default class GetPacientPage extends JSXWithSlots {
    constructor(
        protected logger: Logger,
        private readonly getPacient: () => Promise<Pacient>,
        private readonly getAppointments: () => Promise<WithCount<Appointment[]>>,
        private readonly pacientId: number,
        private readonly pageNumber: number,
        private readonly pageSize: number,
    ) {
        super(logger);
    }

    protected slots = [
        { 
            loading: <Loading/>,
            error: <b>Error</b>,
            content: this.pacientContent.bind(this),
        },
        { 
            loading: <Loading/>,
            error: <b>Error</b>,
            content: this.appointmentContent.bind(this),
        }
    ];

    protected shell(pacientDataSlot: JSX.Element, appointmentDataSlot: JSX.Element): JSX.Element {
        return <LoggedInPage title="Paciente" className="flex-column flex-items-center gap-md">
            <Button htmlTag="a" href="/pacient" className="flex-self-start">
                <ArrowIcon direction="left" width="1.5rem" height="1.5rem"/>
                <span>Voltar</span>
            </Button>
            {pacientDataSlot}
            {appointmentDataSlot}
        </LoggedInPage>
    }

    protected async pacientContent() {
        const pacient = await this.getPacient();
        return <div className="content-wrapper card-lg flex-column">
            <PacientFieldset 
                pacient={pacient} 
                disabled
            />
            <Button htmlTag="a" href={`/pacient/${this.pacientId}/edit`} className="flex-self-end">
                <PenIcon width="1rem" height="1rem"/>
                Editar
            </Button>
        </div>
    }

    protected async appointmentContent() {
        const { data: appointments, count } = await this.getAppointments();
        return <div className="content-wrapper card-lg flex-column">
            <header className="content-faded padding-md border-bottom">
                Consultas
            </header>

            {appointments.map(appointment => (
                <a 
                    key={appointment.id} 
                    href={`/appointment/${appointment.id}`}
                    className="grid grid-flow-row padding-md gap-md"
                    style={{gridTemplateColumns: '9ch auto'}}
                >
                    <span>{appointment.date.toLocaleDateString('pt-br')}</span>
                    <span className="truncate">
                        {appointment.description}
                    </span>
                </a>
            ))}

            <div className="flex-row flex-space-between">
                <Button htmlTag="a" href={`/appointment/pacient/${this.pacientId}/new`}>+ Nova Consulta</Button>
                <PaginationControls 
                    pageNumber={this.pageNumber}
                    pageSize={this.pageSize}
                    totalCount={count}
                    href={`/appointment/pacient/${this.pacientId}`}
                />
            </div>
        </div>
    }
}
