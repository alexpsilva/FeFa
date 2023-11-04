import { z } from "zod"

const PhoneSchema = z.object({
  id: z.number(),
  number: z.string(),
})

const WritablePacientSchema = z.object({
  name: z.string(),
  birthday: z.coerce.date(),
  cpf: z.string().nullish(),
  note: z.string().nullish(),

  address: z.string().nullish(),

  phones: z.array(PhoneSchema).nullish(),
})

const ReadonlyPacientSchema = z.object({
  id: z.number(),

  updatedAt: z.coerce.date(),
  createdAt: z.coerce.date(),
})

const PacientSchema = ReadonlyPacientSchema.merge(WritablePacientSchema)

type Phone = z.infer<typeof PhoneSchema>
type WritablePacient = z.infer<typeof WritablePacientSchema>
type ReadonlyPacient = z.infer<typeof ReadonlyPacientSchema>
type Pacient = z.infer<typeof PacientSchema>

export type { Phone, WritablePacient }
export { PhoneSchema, WritablePacientSchema, PacientSchema }
export default Pacient