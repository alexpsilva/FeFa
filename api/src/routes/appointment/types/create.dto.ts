import { IsDateString, IsInt, IsString } from "class-validator"
import 'reflect-metadata'

export default class CreateAppointmentRequest {
  @IsInt()
  pacientId: number

  @IsDateString()
  date: string

  @IsString()
  description: string
}