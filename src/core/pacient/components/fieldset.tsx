import { Pacient } from "../type";

export default function PacientFieldset({pacient, ...props}: React.ComponentProps<'fieldset'> & {
    pacient?: Partial<Pacient>
}) {
    const age = pacient?.birthday ? new Date().getFullYear() - pacient.birthday.getFullYear() : 0;

    return (
        <fieldset className="padding-lg grid-flow-row grid-cols-2 gap-md" {...props}>
            <div className="flex-column">
                <label htmlFor="name" className="content-faded text-sm">Nome</label>
                <input id="name" name="name" type="text" defaultValue={pacient?.name}/>
            </div>

            <div className="flex-column">
                {(pacient?.birthday && props.disabled) ? (
                    <>
                        <label className="content-faded text-sm">Idade</label>
                        <span>{age} anos <span className="content-faded">({pacient.birthday.toLocaleDateString('pt-br')})</span></span>
                    </>
                ) : (
                    <>
                        <label htmlFor="birthday" className="content-faded text-sm">Data de Nascimento</label>
                        <input id="birthday" name="birthday" type="date" defaultValue={pacient?.birthday?.toISOString().split('T')[0]}/>
                    </>
                )}
            </div>

            <div className="flex-column">
                <label htmlFor="cpf" className="content-faded text-sm">CPF</label>
                <input id="cpf" name="cpf" type="text" defaultValue={pacient?.cpf}/> {/* to-do: Add CPF mask */}
            </div>

            <div className="flex-column">
                <label htmlFor="address" className="content-faded text-sm">Endereço</label>
                <input id="address" name="address" type="text" defaultValue={pacient?.address}/>
            </div>
        </fieldset>
    )
}