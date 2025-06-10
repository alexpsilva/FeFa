import { z } from 'zod';

import { PacientSchema } from '$lib/schemas/core/pacient';

const DbPacientSchema = PacientSchema
    .omit({userId: true, updatedAt: true, createdAt: true})
    .extend({
        user_id: PacientSchema.shape.userId, 
        created_at: PacientSchema.shape.createdAt, 
        updated_at: PacientSchema.shape.updatedAt,
    });

export {
    DbPacientSchema,
}

export type DbPacient = z.infer<typeof DbPacientSchema>;
