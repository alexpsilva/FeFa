import { IsNotEmpty, IsNumberString } from "class-validator"
import 'reflect-metadata'

class GetUserParams {
  @IsNumberString()
  @IsNotEmpty()
  id: string
}

export { GetUserParams }