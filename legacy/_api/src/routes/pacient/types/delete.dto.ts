import { IsNotEmpty, IsNumberString } from "class-validator"
import 'reflect-metadata'

class DeletePacientParams {
  @IsNumberString()
  @IsNotEmpty()
  id: string
}

export { DeletePacientParams }