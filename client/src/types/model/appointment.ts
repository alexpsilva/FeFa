import BaseModel from "./base";

interface Appointment extends BaseModel {
  id: number,
  pacientId: number

  date: Date
  description: string

  updatedAt: string
  createdAt: string
}

export default Appointment