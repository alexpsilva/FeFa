import { z } from 'zod';

const MedicationSchema = z.object({
    id: z.coerce.number(),
    userId: z.coerce.number(),
    
    name: z.coerce.string(),

    updatedAt: z.coerce.date(),
    createdAt: z.coerce.date(),
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
    UpdateMedicationSchema,
    CreateMedicationSchema,
    DeleteMedicationSchema,
}

export type Medication = z.infer<typeof MedicationSchema>;
export type UpdateMedication = z.infer<typeof UpdateMedicationSchema>;
export type CreateMedication = z.infer<typeof CreateMedicationSchema>;
export type DeleteMedication = z.infer<typeof DeleteMedicationSchema>;
