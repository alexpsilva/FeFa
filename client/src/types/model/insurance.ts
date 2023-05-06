import { z } from "zod"

const InsuranceSchema = z.object({
  id: z.number(),

  name: z.string(),

  updatedAt: z.coerce.date(),
  createdAt: z.coerce.date(),
})

type Insurance = z.infer<typeof InsuranceSchema>

export { InsuranceSchema }
export default Insurance