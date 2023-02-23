import BaseModel, { BaseModelToCreate } from "./base";


interface PacientToCreate extends BaseModelToCreate {
  name: string,
  cpf?: string,

  addressStreet?: string,
  addressNumber?: string,
}

const getEmptyPacientToCreate = (): PacientToCreate => ({
  name: ''
})

interface Pacient extends PacientToCreate, BaseModel {
  id: string,

  updatedAt: string,
  createdAt: string,
}

export { getEmptyPacientToCreate }
export type { PacientToCreate }
export default Pacient