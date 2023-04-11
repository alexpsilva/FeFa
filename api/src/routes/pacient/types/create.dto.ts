import { Type } from "class-transformer"
import { IsArray, IsDateString, IsOptional, IsString, ValidateNested } from "class-validator"
import 'reflect-metadata'

class CreatePacientBody {
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
  @Type(() => CreatePacientBodyPhone)
  @ValidateNested({ each: true })
  phones?: CreatePacientBodyPhone[] = []
}

class CreatePacientBodyPhone {
  @IsString()
  label: string

  @IsString()
  number: string
}

export { CreatePacientBody }