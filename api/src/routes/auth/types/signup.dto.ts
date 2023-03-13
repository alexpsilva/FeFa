import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export default class SignupAuthRequest {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsEmail()
  email: string

  @IsString()
  @IsNotEmpty()
  passwordHash: string
}