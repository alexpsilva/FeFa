import { IsDateString, IsInt, IsOptional, IsString } from "class-validator"
import 'reflect-metadata'

class UpdateAppointmentParams {
  @IsOptional()
  @IsInt()
  id: string
}

class UpdateAppointmentBody {
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

export {
  UpdateAppointmentBody,
  UpdateAppointmentParams,
}