import { Type } from "class-transformer"
import { IsArray, IsDateString, IsInt, IsNotEmpty, IsNumberString, IsOptional, IsString, ValidateNested } from "class-validator"
import 'reflect-metadata'

class UpdatePacientParams {
  @IsNumberString()
  @IsNotEmpty()
  id: string
}

class UpdatePacientBody {
  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @IsDateString()
  birthday?: string

  @IsString()
  @IsOptional()
  cpf?: string

  @IsString()
  @IsOptional()
  address?: string

  @IsArray()
  @Type(() => UpdatePacientBodyPhone)
  @ValidateNested({ each: true })
  phones?: UpdatePacientBodyPhone[] = []
}

class UpdatePacientBodyPhone {
  @IsInt()
  @IsOptional()
  id?: number

  @IsString()
  label: string

  @IsString()
  number: string
}

export {
  UpdatePacientBody,
  UpdatePacientParams,
}