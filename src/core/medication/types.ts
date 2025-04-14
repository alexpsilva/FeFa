import { z } from 'zod';

const MedicationSchema = z.object({
    id: z.coerce.number(),
    userId: z.coerce.number(),
    
    name: z.coerce.string(),

    updatedAt: z.coerce.date(),
    createdAt: z.coerce.date(),
});

const DbMedicationSchema = MedicationSchema
    .omit({userId: true, updatedAt: true, createdAt: true})
    .extend({
        user_id: MedicationSchema.shape.userId, 
        created_at: MedicationSchema.shape.createdAt, 
        updated_at: MedicationSchema.shape.updatedAt,
    });

const UpdateMedicationSchema = MedicationSchema.omit({
    updatedAt: true,
    createdAt: true,
});

const CreateMedicationSchema = UpdateMedicationSchema.omit({
    id: true,
});

const DeleteMedicationSchema = MedicationSchema.pick({
    id: true,
    userId: true,
});

export {
    MedicationSchema, 
    DbMedicationSchema,
    UpdateMedicationSchema,
    CreateMedicationSchema,
    DeleteMedicationSchema,
}

export type Medication = z.infer<typeof MedicationSchema>;
export type DbMedication = z.infer<typeof DbMedicationSchema>;
export type UpdateMedication = z.infer<typeof UpdateMedicationSchema>;
export type CreateMedication = z.infer<typeof CreateMedicationSchema>;
export type DeleteMedication = z.infer<typeof DeleteMedicationSchema>;
