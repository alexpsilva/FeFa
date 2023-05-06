import { z } from "zod"

const AppointmentSchema = z.object({
  id: z.number(),
  pacientId: z.number(),

  date: z.coerce.date(),
  description: z.string(),

  updatedAt: z.coerce.date(),
  createdAt: z.coerce.date(),
})

type Appointment = z.infer<typeof AppointmentSchema>

export { AppointmentSchema }
export default Appointment