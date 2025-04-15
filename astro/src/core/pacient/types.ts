import { z } from 'zod';
import { CpfString } from '../shared/schemas/cpf';

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

const DbPacientSchema = PacientSchema
    .omit({userId: true, updatedAt: true, createdAt: true})
    .extend({
        user_id: PacientSchema.shape.userId, 
        created_at: PacientSchema.shape.createdAt, 
        updated_at: PacientSchema.shape.updatedAt,
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
    DbPacientSchema,
    UpdatePacientSchema,
    CreatePacientSchema,
    DeletePacientSchema,
}

export type Pacient = z.infer<typeof PacientSchema>;
export type DbPacient = z.infer<typeof DbPacientSchema>;
export type UpdatePacient = z.infer<typeof UpdatePacientSchema>;
export type CreatePacient = z.infer<typeof CreatePacientSchema>;
export type DeletePacient = z.infer<typeof DeletePacientSchema>;
