import BaseModel from "./base"

interface Insurance extends BaseModel {
  id: number
  name: string
  updatedAt: string
  createdAt: string
}

export default Insurance