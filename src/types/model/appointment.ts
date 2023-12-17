import { z } from "zod"

const WritableAppointmentSchema = z.object({
  date: z.coerce.date(),
  description: z.string(),
})

const ReadonlyAppointmentSchema = z.object({
  id: z.number(),

  pacientId: z.number(),

  updatedAt: z.coerce.date(),
  createdAt: z.coerce.date(),
})

const AppointmentSchema = ReadonlyAppointmentSchema
  .merge(WritableAppointmentSchema)
const WritableAppointmentWithPacientIdSchema = WritableAppointmentSchema
  .merge(AppointmentSchema.pick({ 'pacientId': true }))

type WritableAppointmentWithPacientId = z.infer<typeof WritableAppointmentWithPacientIdSchema>
type WritableAppointment = z.infer<typeof WritableAppointmentSchema>
type ReadonlyAppointment = z.infer<typeof ReadonlyAppointmentSchema>
type Appointment = z.infer<typeof AppointmentSchema>


export type { WritableAppointment, WritableAppointmentWithPacientId }
export { WritableAppointmentWithPacientIdSchema, WritableAppointmentSchema, AppointmentSchema }
export default Appointment