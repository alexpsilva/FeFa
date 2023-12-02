import { z } from "zod"

const WritablePhoneSchema = z.object({
  number: z.string(),
})

const PhoneSchema = WritablePhoneSchema.extend({
  id: z.number(),
})

const WritablePacientSchema = z.object({
  name: z.string(),
  birthday: z.coerce.date(),
  cpf: z.string().nullish(),
  note: z.string().nullish(),

  address: z.string().nullish(),

  phones: z.array(WritablePhoneSchema).nullish(),
})

const PacientSchema = WritablePacientSchema.extend({
  id: z.number(),

  phones: z.array(PhoneSchema).nullish(),

  updatedAt: z.coerce.date(),
  createdAt: z.coerce.date(),
})

type Phone = z.infer<typeof PhoneSchema>

type WritablePacient = z.infer<typeof WritablePacientSchema>
type Pacient = z.infer<typeof PacientSchema>

export type { Phone, WritablePacient }
export { PhoneSchema, WritablePacientSchema, PacientSchema }
export default Pacient