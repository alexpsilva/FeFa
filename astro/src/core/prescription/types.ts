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

const DbPrescriptionSchema = PrescriptionSchema
    .omit({
        startedOnAppointmentId: true, 
        endedOnAppointmentId: true,
        medicationId: true,
        updatedAt: true, 
        createdAt: true
    })
    .extend({
        started_on_appointment_id: PrescriptionSchema.shape.startedOnAppointmentId, 
        ended_on_appointment_id: PrescriptionSchema.shape.endedOnAppointmentId,
        medication_id: PrescriptionSchema.shape.medicationId,
        created_at: PrescriptionSchema.shape.createdAt, 
        updated_at: PrescriptionSchema.shape.updatedAt,
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
    DbPrescriptionSchema,
    UpdatePrescriptionSchema,
    CreatePrescriptionSchema,
    DeletePrescriptionSchema,
}

export type Prescription = z.infer<typeof PrescriptionSchema>;
export type DbPrescription = z.infer<typeof DbPrescriptionSchema>;
export type UpdatePrescription = z.infer<typeof UpdatePrescriptionSchema>;
export type CreatePrescription = z.infer<typeof CreatePrescriptionSchema>;
export type DeletePrescription = z.infer<typeof DeletePrescriptionSchema>;
