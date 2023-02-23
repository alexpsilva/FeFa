import BaseModel from "./base"

interface Insurance extends BaseModel {
  id: string
  name: string
  updatedAt: string
  createdAt: string
}

export default Insurance