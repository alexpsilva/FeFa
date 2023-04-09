import { IsInt } from "class-validator"
import 'reflect-metadata'

export default class DeletePacientRequest {
  @IsInt()
  id: number
}