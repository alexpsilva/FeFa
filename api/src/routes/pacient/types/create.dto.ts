import { Type } from "class-transformer"
import { IsArray, IsDateString, IsOptional, IsString, ValidateNested } from "class-validator"
import 'reflect-metadata'

export default class CreatePacientRequest {
  @IsString()
  name: string

  @IsDateString()
  birthday: string

  @IsString()
  @IsOptional()
  cpf?: string

  @IsString()
  @IsOptional()
  address?: string

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