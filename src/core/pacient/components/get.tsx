import { Pacient } from "../type";

export default function GetPacient(pacient: Pacient, streamTo: string) {
    return (
        <form action="/pacient/update" method="post" stream-to={streamTo}>
            <label>Nome <input name="name" type="text" defaultValue={pacient.name}/></label>
            <label>CPF <input name="cpf" type="text" defaultValue={pacient.cpf}/></label>
            <label>Data de Nascimento <input name="birthday" type="date" defaultValue={pacient.birthday.toISOString().split('T')[0] }/></label>
            <label>Endereço <input name="address" type="text" defaultValue={pacient.address}/></label>

            <button type="submit">Salvar</button>
            <button type="reset">Cancelar</button>
        </form>
    )
}