type BaseModelValue = number | string | undefined | null | BaseModel

type BaseModelToCreate = {
  [key: string]: BaseModelValue | BaseModelValue[]
}

type BaseModel = {
  id: string
  [key: string]: BaseModelValue | BaseModelValue[]
}

export type { BaseModelToCreate, BaseModelValue }
export default BaseModel