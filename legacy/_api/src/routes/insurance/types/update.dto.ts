import { IsOptional, IsString } from "class-validator"
import 'reflect-metadata'

export default class UpdateInsuranceRequest {
  @IsOptional()
  @IsString()
  name?: string
}