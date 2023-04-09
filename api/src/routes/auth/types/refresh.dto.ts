import { IsJWT, IsNotEmpty, IsString } from "class-validator";

export default class RefreshAuthRequest {
  @IsString()
  @IsNotEmpty()
  @IsJWT()
  refreshToken: string
}