import { IsBooleanString, IsNumberString, IsOptional } from "class-validator"
import 'reflect-metadata'

export default class GetAppointmentRequest {
  @IsBooleanString()
  @IsOptional()
  includePacient?: string
}