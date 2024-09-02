export default function Menu() {
    return (
        <menu className="content-wrapper flex-column text-lg content-evidence items-hover-invert">
            <div className="flex-column flex-grow">
                <a href="/">Home</a>
                <a href="/pacient">Pacientes</a>
                <a href="/appointments">Consultas</a>
            </div>
            <div style={{marginBottom: '1rem'}}>
                <a href="/logout">Sair</a>
            </div>
        </menu>
    )
}