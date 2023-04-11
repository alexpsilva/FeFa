import { IsJWT, IsNotEmpty, IsString } from "class-validator";

class LoginAuthBody {
  @IsString()
  @IsNotEmpty()
  @IsJWT()
  googleToken: string
}

export { LoginAuthBody }