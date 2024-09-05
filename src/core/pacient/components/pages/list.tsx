import { WithCount } from "../../../../infra/database/repository";
import Logger from "../../../../infra/log";
import JSXWithSlots from "../../../../infra/render/jsx/jsx_with_slots";
import SearchIcon from "../../../../shared/components/icons/search";
import Loading from "../../../../shared/components/loading";
import LoggedInPage from "../../../../shared/components/logged_in_page";
import PaginationControls from "../../../../shared/components/pagination_controls";
import { Pacient } from "../../type";

export default class ListPacientsPage extends JSXWithSlots {
    constructor(
        protected logger: Logger,
        private readonly getPacients: () => Promise<WithCount<Pacient[]>>,
        private readonly searchTerm: string,
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
        return <LoggedInPage title="Pacientes" className="flex-column flex-items-center gap-lg">
            <form 
                action="/pacient" 
                method="get" 
                className="content-wrapper card-md flex-row items-hover-invert"
            >
                <input 
                    type="text" 
                    name="name" 
                    placeholder="Pesquisar" 
                    defaultValue={this.searchTerm} 
                    className="flex-grow padding-md transparent"
                />
                <button 
                    type="submit" 
                    className="padding-x-md border-radius transparent cursor-pointer content-evidence"
                >
                    <SearchIcon width="1.5rem" height="1.5rem"/>
                </button>
            </form>
            <div className="content-wrapper card-lg flex-column items-hover-invert">
                {pacientListSlot}
            </div>
        </LoggedInPage>
    }

    protected async content() {
        const { count, data: pacients} = await this.getPacients();
        return <>
            <header className="content-faded padding-md border-bottom">
                Nome
            </header>
            <div className="flex-column items-padding-md">
                {pacients.map(pacient => (
                    <a key={pacient.id} href={`/pacient/${pacient.id}`}>{pacient.name}</a>
                ))}
            </div>
            <div className="flex-row flex-space-between">
                <a 
                    href="/pacient/new" 
                    className="border-radius padding-md content-evidence"
                >
                    + Novo Paciente
                </a>
                <PaginationControls 
                    pageNumber={this.pageNumber}
                    pageSize={this.pageSize}
                    totalCount={count}
                    href={`/pacient?name=${this.searchTerm}`}
                />
            </div>
        </>
    }
}