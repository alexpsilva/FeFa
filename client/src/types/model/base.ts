type BaseModelValue = number | string | undefined | null | BaseModel

type BaseModel = {
  id: string
  [key: string]: BaseModelValue | BaseModelValue[]
}

export default BaseModel