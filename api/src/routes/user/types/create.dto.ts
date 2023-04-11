import { IsEmail, IsNotEmpty, IsString } from "class-validator"
import 'reflect-metadata'

class CreateUserBody {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string
}

export { CreateUserBody }