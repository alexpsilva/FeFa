import { z } from 'zod';

const userId = z.coerce.number();

const PrescriptionSchema = z.object({
    id: z.coerce.number(),

    startedOnAppointmentId: z.coerce.number(),
    endedOnAppointmentId: z.coerce.number().optional(),
    
    medicationId: z.coerce.number(),
    dose: z.coerce.string().optional(),
    frequency: z.coerce.string(),

    updatedAt: z.coerce.date(),
    createdAt: z.coerce.date(),
});

const UpdatePrescriptionSchema = PrescriptionSchema.omit({
    updatedAt: true,
    createdAt: true,
}).extend({ userId });

const CreatePrescriptionSchema = UpdatePrescriptionSchema.omit({
    id: true,
});

const DeletePrescriptionSchema = PrescriptionSchema.pick({ id: true })
    .extend({ userId });

export {
    PrescriptionSchema, 
    UpdatePrescriptionSchema,
    CreatePrescriptionSchema,
    DeletePrescriptionSchema,
}

export type Prescription = z.infer<typeof PrescriptionSchema>;
export type UpdatePrescription = z.infer<typeof UpdatePrescriptionSchema>;
export type CreatePrescription = z.infer<typeof CreatePrescriptionSchema>;
export type DeletePrescription = z.infer<typeof DeletePrescriptionSchema>;
