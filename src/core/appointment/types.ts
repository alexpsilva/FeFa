import { z } from 'zod';

const userId = z.coerce.number();

const AppointmentSchema = z.object({
    id: z.coerce.number(),
    pacientId: z.coerce.number(),
    
    description: z.coerce.string(),
    date: z.coerce.date(),

    updatedAt: z.coerce.date(),
    createdAt: z.coerce.date(),
});

const DbAppointmentSchema = AppointmentSchema
    .omit({pacientId: true, updatedAt: true, createdAt: true})
    .extend({pacient_id: AppointmentSchema.shape.pacientId, created_at: AppointmentSchema.shape.createdAt, updated_at: AppointmentSchema.shape.updatedAt});

const UpdateAppointmentSchema = AppointmentSchema.omit({
    updatedAt: true,
    createdAt: true,
}).extend({ userId });


const CreateAppointmentSchema = UpdateAppointmentSchema.omit({ id: true });

const DeleteAppointmentSchema = AppointmentSchema.pick({ id: true })
    .extend({ userId });


export {
    AppointmentSchema,
    DbAppointmentSchema,
    UpdateAppointmentSchema,
    CreateAppointmentSchema,
    DeleteAppointmentSchema,
}

export type Appointment = z.infer<typeof AppointmentSchema>;
export type DbAppointment = z.infer<typeof DbAppointmentSchema>;
export type CreateAppointment = z.infer<typeof CreateAppointmentSchema>;
export type UpdateAppointment = z.infer<typeof UpdateAppointmentSchema>;
export type DeleteAppointment = z.infer<typeof DeleteAppointmentSchema>;
