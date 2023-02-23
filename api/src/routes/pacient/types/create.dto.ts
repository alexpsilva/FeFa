import { Type } from "class-transformer"
import { IsArray, IsOptional, IsString, ValidateNested } from "class-validator"
import 'reflect-metadata'

export default class CreatePacientRequest {
  @IsString()
  name: string

  @IsString()
  @IsOptional()
  cpf?: string

  @IsString()
  @IsOptional()
  addressStreet?: string

  @IsString()
  @IsOptional()
  addressNumber?: string

  @IsArray()
  @Type(() => CreatePacientRequestPhone)
  @ValidateNested({ each: true })
  phones?: CreatePacientRequestPhone[] = []
}

class CreatePacientRequestPhone {
  @IsString()
  label: string

  @IsString()
  number: string
}