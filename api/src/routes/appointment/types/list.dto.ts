import { IsBooleanString, IsNumberString, IsOptional } from "class-validator"
import 'reflect-metadata'

export default class ListAppointmentRequest {
  @IsNumberString()
  @IsOptional()
  pacientId?: string

  @IsBooleanString()
  @IsOptional()
  includePacient?: string
}