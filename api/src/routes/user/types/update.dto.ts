import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator"
import 'reflect-metadata'

export default class UpdateUserRequest {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name: string

  @IsOptional()
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string
}