import { AppointmentSchema } from '$lib/schemas/core/appointment';
import { z } from 'zod';

const DbAppointmentSchema = AppointmentSchema
    .omit({pacientId: true, updatedAt: true, createdAt: true})
    .extend({
        pacient_id: AppointmentSchema.shape.pacientId, 
        created_at: AppointmentSchema.shape.createdAt, 
        updated_at: AppointmentSchema.shape.updatedAt,
    });

export {
    DbAppointmentSchema,
}

export type DbAppointment = z.infer<typeof DbAppointmentSchema>;
