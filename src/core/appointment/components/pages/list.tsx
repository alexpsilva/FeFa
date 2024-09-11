import { WithCount } from "../../../../infra/database/repository";
import Logger from "../../../../infra/log";
import JSXWithSlots from "../../../../infra/render/jsx/jsx_with_slots";
import Loading from "../../../../shared/components/loading";
import LoggedInPage from "../../../../shared/components/logged_in_page";
import PaginationControls from "../../../../shared/components/pagination_controls";
import { Pacient } from "../../../pacient/type";
import { Appointment } from "../../type";

export default class ListAppointmentsPage extends JSXWithSlots {
    constructor(
        protected logger: Logger,
        private readonly getAppointments: () => Promise<WithCount<(Appointment & {pacient: Pacient})[]>>,
        private readonly pageNumber: number,
        private readonly pageSize: number,
    ) {
        super(logger);
    }

    protected slots = [
        {
            loading: <Loading/>,
            error: <b>Error</b>,
            content: this.content.bind(this),
        }
    ];

    protected shell(pacientListSlot: JSX.Element): JSX.Element {
        return <LoggedInPage title="Consultas" className="flex-column flex-items-center gap-lg">
            {/* to-do: Add date filter */}
            {pacientListSlot}
        </LoggedInPage>
    }

    protected async content() {
        const { count, data: appointments} = await this.getAppointments();
        return <div className="content-wrapper card-lg flex-column">
            <header className="content-faded padding-md border-bottom">
                Consultas
            </header>
            <div className="flex-column items-padding-md">
                {appointments.map(appointment => (       
                    <a 
                        key={appointment.id} 
                        href={`/appointment/${appointment.id}`}
                        className="grid grid-flow-row padding-md gap-md"
                        style={{gridTemplateColumns: '9ch 15rem auto'}}
                    >
                        <span>{appointment.date.toLocaleDateString('pt-br')}</span>
                        <span>{appointment.pacient.name}</span>
                        <span className="truncate">
                            {appointment.description}
                        </span>
                    </a>
                ))}
            </div>
            <div className="flex-row flex-space-between">
                <div className="flex-grow"/>
                <PaginationControls 
                    pageNumber={this.pageNumber}
                    pageSize={this.pageSize}
                    totalCount={count}
                    href={`/appointment`}
                />
            </div>
        </div>
    }
}