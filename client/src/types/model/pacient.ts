import BaseModel from "./base";

interface Phone extends BaseModel {
  id: number

  label?: string
  number: string
}

interface Pacient extends BaseModel {
  id: number

  name: string
  birthday: string
  cpf?: string

  address?: string

  phones: Phone[]

  updatedAt: string
  createdAt: string
}

export type { Phone }
export default Pacient