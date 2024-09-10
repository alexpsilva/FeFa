import { z } from 'zod';
import { CpfString } from '../../shared/schemas/cpf';
import { PaginationDto } from '../../shared/schemas/pagination';

const Pacient = z.object({
    id: z.coerce.number(),
    userId: z.coerce.number(),
    
    name: z.coerce.string(),
    birthday: z.coerce.date(),
    cpf: CpfString,
    address: z.coerce.string(),

    updatedAt: z.coerce.date(),
    createdAt: z.coerce.date(),
});

const DbPacient = Pacient
    .omit({userId: true, updatedAt: true, createdAt: true})
    .extend({user_id: Pacient.shape.userId, created_at: Pacient.shape.createdAt, updated_at: Pacient.shape.updatedAt});

const GetPacientDto = Pacient.pick({
    userId: true,
    id: true,
})
    .merge(PaginationDto.partial());

const ListPacientsDto = Pacient.pick({ userId: true })
    .merge(z.object({name: Pacient.shape.name.default('') }))
    .merge(PaginationDto.partial());

const UpdatePacientDto = GetPacientDto;

const UpdatePacientActionDto = Pacient.omit({
    updatedAt: true,
    createdAt: true,
});

const CreatePacientDto = Pacient.pick({ userId: true })

const CreatePacientActionDto = UpdatePacientActionDto.omit({
    id: true,
});


export {
    Pacient,
    DbPacient,
    GetPacientDto,
    ListPacientsDto,
    UpdatePacientDto,
    UpdatePacientActionDto,
    CreatePacientDto,
    CreatePacientActionDto,
}

export type Pacient = z.infer<typeof Pacient>;
export type DbPacient = z.infer<typeof DbPacient>;
export type GetPacientDto = z.infer<typeof GetPacientDto>;
export type ListPacientsDto = z.infer<typeof ListPacientsDto>;
export type UpdatePacientDto = z.infer<typeof UpdatePacientDto>;
export type UpdatePacientActionDto = z.infer<typeof UpdatePacientActionDto>;
export type CreatePacientDto = z.infer<typeof CreatePacientDto>;
export type CreatePacientActionDto = z.infer<typeof CreatePacientActionDto>;