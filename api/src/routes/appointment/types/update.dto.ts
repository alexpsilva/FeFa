import { IsDateString, IsInt, IsNumberString, IsOptional, IsString } from "class-validator"
import 'reflect-metadata'

class UpdateAppointmentParams {
  @IsOptional()
  @IsNumberString()
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