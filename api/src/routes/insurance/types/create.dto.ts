import { IsString } from "class-validator"
import 'reflect-metadata'

export default class CreateInsuranceRequest {
  @IsString()
  name: string
}