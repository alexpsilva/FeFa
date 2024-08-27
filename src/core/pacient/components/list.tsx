import { Pacient } from "../type";

export default function ListPacients(pacients: Pacient[], streamTo: string) {
    return (
        <ul stream-to={streamTo}>
            {pacients.map(pacient => (
                <li key={pacient.id}>
                    <a href={`/pacient/${pacient.id}`}>{pacient.name}</a>
                </li>
            ))}
        </ul>
    )
}