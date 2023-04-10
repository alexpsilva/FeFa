import { IsInt } from "class-validator"
import 'reflect-metadata'

export default class DeleteAppointmentRequest {
  @IsInt()
  id: number
}