type BaseModelValue = number | string | Date | undefined | null | BaseModel

type BaseModel = {
  id: number
  [key: string]: BaseModelValue | BaseModelValue[]
}

export default BaseModel