import BaseModel from "./base";

interface Phone extends BaseModel {
  id: string

  label?: string
  number: string
}

interface Pacient extends BaseModel {
  id: string,

  name: string,
  cpf?: string,

  addressStreet?: string,
  addressNumber?: string,

  phones: Phone[]

  updatedAt: string,
  createdAt: string,
}

export type { Phone }
export default Pacient