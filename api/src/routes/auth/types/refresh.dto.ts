import { IsJWT, IsNotEmpty, IsString } from "class-validator";

class RefreshAuthBody {
  @IsString()
  @IsNotEmpty()
  @IsJWT()
  refreshToken: string
}

export { RefreshAuthBody }