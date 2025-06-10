import { z } from 'zod';
import { CpfString } from '$lib/schemas/cpf';

const PacientSchema = z.object({
    id: z.coerce.number(),
    userId: z.coerce.number(),
    
    name: z.coerce.string(),
    birthday: z.coerce.date(),
    cpf: CpfString,
    address: z.coerce.string(),

    updatedAt: z.coerce.date(),
    createdAt: z.coerce.date(),
});

const UpdatePacientSchema = PacientSchema.omit({
    updatedAt: true,
    createdAt: true,
});

const CreatePacientSchema = UpdatePacientSchema.omit({
    id: true,
});

const DeletePacientSchema = PacientSchema.pick({
    id: true,
    userId: true,
});

export {
    PacientSchema, 
    UpdatePacientSchema,
    CreatePacientSchema,
    DeletePacientSchema,
}

export type Pacient = z.infer<typeof PacientSchema>;
export type UpdatePacient = z.infer<typeof UpdatePacientSchema>;
export type CreatePacient = z.infer<typeof CreatePacientSchema>;
export type DeletePacient = z.infer<typeof DeletePacientSchema>;
