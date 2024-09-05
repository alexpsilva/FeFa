export default function Menu() {
    return (
        <menu className="content-wrapper flex-column text-lg content-evidence">
            <a href="/">Home</a>
            <a href="/pacient">Pacientes</a>
            <a href="/appointments">Consultas</a>
            <div className="flex-grow"/>
            <a href="/logout" style={{marginBottom: '1rem'}}>Sair</a>
        </menu>
    )
}