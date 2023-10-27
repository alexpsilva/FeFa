import { IsInt } from "class-validator"
import 'reflect-metadata'

class DeleteAppointmentRequest {
  @IsInt()
  id: number
}

export { DeleteAppointmentRequest }