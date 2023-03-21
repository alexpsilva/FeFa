import { IsEmail, IsNotEmpty, IsString } from "class-validator"
import 'reflect-metadata'

export default class CreateUserRequest {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string
}