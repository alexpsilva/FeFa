import JSXWithSlots from "../../../../infra/render/jsx/jsx_with_slots";
import ArrowIcon from "../../../../shared/components/icons/arrow";
import SearchIcon from "../../../../shared/components/icons/search";
import Loading from "../../../../shared/components/loading";
import LoggedInPage from "../../../../shared/components/logged_in_page";
import { Pacient } from "../../type";

export default class ListPacientsPage extends JSXWithSlots {
    constructor(
        private readonly getPacients: () => Promise<Pacient[]>,
        private readonly searchTerm?: string,
    ) {
        super();
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
                <div className="flex-row flex-space-between">
                    <a 
                        href="/pacient/new" 
                        className="padding-md border-radius content-evidence"
                    >
                        + Novo Paciente
                    </a>
                    <div className="flex-row gap-sm ">
                        <a href={`/pacient`} className="padding-x-md border-radius content-evidence flex-items-center">
                            <ArrowIcon direction="left" width="1.5rem" height="1.5rem"/>
                        </a>
                        <span className="flex-items-center">1/0</span>
                        <a href={`/pacient`} className="padding-x-md border-radius content-evidence flex-items-center">
                            <ArrowIcon direction="right" width="1.5rem" height="1.5rem"/>
                        </a>
                    </div>
                </div>
            </div>
        </LoggedInPage>
    }

    protected async content() {
        const pacients = await this.getPacients();
        return <div className="flex-column items-padding-md">
            <header className="content-faded border-bottom">
                Nome
            </header>
            {pacients.map(pacient => (
                <a key={pacient.id} href={`/pacient/${pacient.id}`}>{pacient.name}</a>
            ))}
        </div>
    }
}