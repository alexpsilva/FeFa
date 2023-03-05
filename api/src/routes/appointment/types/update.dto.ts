import { IsDateString, IsInt, IsOptional, IsString } from "class-validator"
import 'reflect-metadata'

export default class UpdateAppointmentRequest {
  @IsOptional()
  @IsInt()
  pacientId: number

  @IsOptional()
  @IsDateString()
  date: string

  @IsOptional()
  @IsString()
  description: string
}