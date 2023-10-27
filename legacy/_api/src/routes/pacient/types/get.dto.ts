import { IsNotEmpty, IsNumberString } from "class-validator"
import 'reflect-metadata'

class GetPacientParams {
  @IsNumberString()
  @IsNotEmpty()
  id: string
}

export { GetPacientParams }