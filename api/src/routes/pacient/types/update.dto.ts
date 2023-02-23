import { Type } from "class-transformer"
import { IsArray, IsInt, IsOptional, IsString, ValidateNested } from "class-validator"
import 'reflect-metadata'

export default class UpdatePacientRequest {
  @IsOptional()
  @IsString()
  name?: string

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
  @Type(() => UpdatePacientRequestPhone)
  @ValidateNested({ each: true })
  phones?: UpdatePacientRequestPhone[] = []
}

class UpdatePacientRequestPhone {
  @IsInt()
  @IsOptional()
  id?: number

  @IsString()
  label: string

  @IsString()
  number: string
}