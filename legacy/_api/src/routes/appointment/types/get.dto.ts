import { IsNotEmpty, IsNumberString } from "class-validator"
import 'reflect-metadata'

class GetAppointmentParams {
  @IsNumberString()
  @IsNotEmpty()
  id: string
}

export { GetAppointmentParams }