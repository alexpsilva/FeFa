import { Pacient } from "../type";

export default function PacientForm({pacient, children, ...props}: React.ComponentProps<'form'> & {
    pacient?: Partial<Pacient>
}) {
    return (
        <form {...props}>
            <label htmlFor="name">Nome </label>
            <input id="name" name="name" type="text" defaultValue={pacient?.name}/>

            <label htmlFor="cpf">CPF </label>
            <input id="cpf" name="cpf" type="text" defaultValue={pacient?.cpf}/>

            <label htmlFor="birthday">Data de Nascimento </label>
            <input id="birthday" name="birthday" type="date" defaultValue={pacient?.birthday?.toISOString().split('T')[0] }/>

            <label htmlFor="address">Endereço </label>
            <input id="address" name="address" type="text" defaultValue={pacient?.address}/>

            {children}
        </form>
    )
}