import { z } from "zod"

const WritableAppointmentSchema = z.object({
  pacientId: z.number(),

  date: z.coerce.date(),
  description: z.string(),
})

const ReadonlyAppointmentSchema = z.object({
  id: z.number(),

  updatedAt: z.coerce.date(),
  createdAt: z.coerce.date(),
})

const AppointmentSchema = ReadonlyAppointmentSchema.merge(WritableAppointmentSchema)

type WritableAppointment = z.infer<typeof WritableAppointmentSchema>
type ReadonlyAppointment = z.infer<typeof ReadonlyAppointmentSchema>
type Appointment = z.infer<typeof AppointmentSchema>

export type { WritableAppointment }
export { WritableAppointmentSchema, AppointmentSchema }
export default Appointment