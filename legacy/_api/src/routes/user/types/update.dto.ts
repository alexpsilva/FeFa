import { IsEmail, IsNotEmpty, IsNumberString, IsOptional, IsString } from "class-validator"
import 'reflect-metadata'

class UpdateUserBody {
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

class UpdateUserParams {
  @IsNumberString()
  @IsNotEmpty()
  id: string
}

export {
  UpdateUserBody,
  UpdateUserParams,
}