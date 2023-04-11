import { IsDateString, IsInt, IsString } from "class-validator"
import 'reflect-metadata'

class CreateAppointmentBody {
  @IsInt()
  pacientId: number

  @IsDateString()
  date: string

  @IsString()
  description: string
}

export { CreateAppointmentBody }