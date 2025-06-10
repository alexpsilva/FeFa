import { MedicationSchema } from '$lib/schemas/core/medication';
import { z } from 'zod';

const DbMedicationSchema = MedicationSchema
    .omit({userId: true, updatedAt: true, createdAt: true})
    .extend({
        user_id: MedicationSchema.shape.userId, 
        created_at: MedicationSchema.shape.createdAt, 
        updated_at: MedicationSchema.shape.updatedAt,
    });
    
export {
    DbMedicationSchema,
}

export type DbMedication = z.infer<typeof DbMedicationSchema>;
