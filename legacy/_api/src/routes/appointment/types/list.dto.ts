import { IsBooleanString, IsNumberString, IsOptional } from "class-validator"
import 'reflect-metadata'

class ListAppointmentQuery {
  @IsNumberString()
  @IsOptional()
  pacientId?: string

  @IsBooleanString()
  @IsOptional()
  includePacient?: string
}

export { ListAppointmentQuery }