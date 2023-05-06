import { z } from "zod"

const PhoneSchema = z.object({
  id: z.number(),

  label: z.string().nullable(),
  number: z.string(),
})

const PacientSchema = z.object({
  id: z.number(),

  name: z.string(),
  birthday: z.string(),
  cpf: z.string().nullable(),

  address: z.string().nullable(),

  phones: z.array(PhoneSchema).optional(),

  updatedAt: z.coerce.date(),
  createdAt: z.coerce.date(),
})

type Phone = z.infer<typeof PhoneSchema>
type Pacient = z.infer<typeof PacientSchema>

export type { Phone }
export { PhoneSchema, PacientSchema }
export default Pacient