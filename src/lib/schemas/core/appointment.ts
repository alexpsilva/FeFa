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

const UpdateAppointmentSchema = AppointmentSchema.omit({
    updatedAt: true,
    createdAt: true,
}).extend({ userId });

const CreateAppointmentSchema = UpdateAppointmentSchema.omit({ id: true });

const DeleteAppointmentSchema = AppointmentSchema.pick({ id: true })
    .extend({ userId });

export {
    AppointmentSchema,
    UpdateAppointmentSchema,
    CreateAppointmentSchema,
    DeleteAppointmentSchema,
}

export type Appointment = z.infer<typeof AppointmentSchema>;
export type CreateAppointment = z.infer<typeof CreateAppointmentSchema>;
export type UpdateAppointment = z.infer<typeof UpdateAppointmentSchema>;
export type DeleteAppointment = z.infer<typeof DeleteAppointmentSchema>;
