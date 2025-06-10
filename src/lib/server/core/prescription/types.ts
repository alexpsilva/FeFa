import { z } from 'zod';

import { PrescriptionSchema } from '$lib/schemas/core/prescription';

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

export {
    DbPrescriptionSchema,
}

export type DbPrescription = z.infer<typeof DbPrescriptionSchema>;
