import LogoutIcon from "./icons/logout";

export default function Menu() {
    return (
        <menu className="content-wrapper flex-column text-lg content-evidence">
            <a href="/">Home</a>
            <a href="/pacient">Pacientes</a>
            <a href="/appointment">Consultas</a>
            <div className="flex-grow"/>
            <a href="/logout" className="flex-row flex-items-center gap-sm" style={{marginBottom: '1rem'}}>
                <LogoutIcon width="1.5rem" height="1.5rem"/>
                Sair
            </a>
        </menu>
    )
}