import { IsArray, IsOptional, IsString } from "class-validator";

class BatchUpdateInsuranceBody {
  @IsString()
  id: string

  @IsOptional()
  @IsString()
  name?: string
}

class CreateInsuranceBody {
  @IsString()
  name: string
}

class BatchInsuranceBody {
  @IsOptional()
  @IsArray()
  delete?: string[]

  @IsOptional()
  @IsArray()
  update?: BatchUpdateInsuranceBody[]

  @IsOptional()
  @IsArray()
  create?: CreateInsuranceBody[]
}

export { BatchInsuranceBody }