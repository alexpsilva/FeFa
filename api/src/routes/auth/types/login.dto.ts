import { IsJWT, IsNotEmpty, IsString } from "class-validator";

export default class LoginAuthRequest {
  @IsString()
  @IsNotEmpty()
  @IsJWT()
  idToken: string
}