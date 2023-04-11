import { IsNotEmpty, IsNumberString } from "class-validator"
import 'reflect-metadata'

class DeleteUserParams {
  @IsNumberString()
  @IsNotEmpty()
  id: string
}

export { DeleteUserParams }