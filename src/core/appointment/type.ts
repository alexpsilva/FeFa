import { z } from 'zod';
import { PaginationDto } from '../../shared/schemas/pagination';

const userId = z.coerce.number();

const Appointment = z.object({
    id: z.coerce.number(),
    pacientId: z.coerce.number(),
    
    description: z.coerce.string(),
    date: z.coerce.date(),

    updatedAt: z.coerce.date(),
    createdAt: z.coerce.date(),
});

const DbAppointment = Appointment
    .omit({pacientId: true, updatedAt: true, createdAt: true})
    .extend({pacient_id: Appointment.shape.pacientId, created_at: Appointment.shape.createdAt, updated_at: Appointment.shape.updatedAt});

const GetAppointmentDto = Appointment.pick({
    pacientId: true,
    id: true,
}).extend({ userId });

const ListAppointmentsDto = z.object({ userId })
    .merge(PaginationDto.partial());

const UpdateAppointmentDto = Appointment.pick({ id: true })
    .extend({ userId });;

const UpdateAppointmentActionDto = Appointment.omit({
    updatedAt: true,
    createdAt: true,
}).extend({ userId });

const CreateAppointmentDto = GetAppointmentDto.omit({ id: true })

const CreateAppointmentActionDto = UpdateAppointmentActionDto.omit({ id: true });

const DeleteAppointmentActionDto = Appointment.pick({ id: true })
    .extend({ userId });


export {
    Appointment,
    DbAppointment,
    GetAppointmentDto,
    ListAppointmentsDto,
    UpdateAppointmentDto,
    UpdateAppointmentActionDto,
    CreateAppointmentDto,
    CreateAppointmentActionDto,
    DeleteAppointmentActionDto,
}

export type Appointment = z.infer<typeof Appointment>;
export type DbAppointment = z.infer<typeof DbAppointment>;
export type GetAppointmentDto = z.infer<typeof GetAppointmentDto>;
export type ListAppointmentsDto = z.infer<typeof ListAppointmentsDto>;
export type UpdateAppointmentDto = z.infer<typeof UpdateAppointmentDto>;
export type UpdateAppointmentActionDto = z.infer<typeof UpdateAppointmentActionDto>;
export type CreateAppointmentDto = z.infer<typeof CreateAppointmentDto>;
export type CreateAppointmentActionDto = z.infer<typeof CreateAppointmentActionDto>;
export type DeleteAppointmentActionDto = z.infer<typeof DeleteAppointmentActionDto>;