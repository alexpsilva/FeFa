import { z } from 'zod';

const TreatmentSchema = z.object({
    id: z.coerce.number(),
    userId: z.coerce.number(),
    
    name: z.coerce.string(),

    updatedAt: z.coerce.date(),
    createdAt: z.coerce.date(),
});

const DbTreatmentSchema = TreatmentSchema
    .omit({userId: true, updatedAt: true, createdAt: true})
    .extend({
        user_id: TreatmentSchema.shape.userId, 
        created_at: TreatmentSchema.shape.createdAt, 
        updated_at: TreatmentSchema.shape.updatedAt,
    });

const UpdateTreatmentSchema = TreatmentSchema.omit({
    updatedAt: true,
    createdAt: true,
});

const CreateTreatmentSchema = UpdateTreatmentSchema.omit({
    id: true,
});

const DeleteTreatmentSchema = TreatmentSchema.pick({
    id: true,
    userId: true,
});

export {
    TreatmentSchema, 
    DbTreatmentSchema,
    UpdateTreatmentSchema,
    CreateTreatmentSchema,
    DeleteTreatmentSchema,
}

export type Treatment = z.infer<typeof TreatmentSchema>;
export type DbTreatment = z.infer<typeof DbTreatmentSchema>;
export type UpdateTreatment = z.infer<typeof UpdateTreatmentSchema>;
export type CreateTreatment = z.infer<typeof CreateTreatmentSchema>;
export type DeleteTreatment = z.infer<typeof DeleteTreatmentSchema>;
