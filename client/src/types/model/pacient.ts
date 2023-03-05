import BaseModel from "./base";

interface Phone extends BaseModel {
  id: string

  label?: string
  number: string
}

interface Pacient extends BaseModel {
  id: string,

  name: string,
  birthday: string,
  cpf?: string,

  address?: string,

  phones: Phone[]

  updatedAt: string,
  createdAt: string,
}

export type { Phone }
export default Pacient