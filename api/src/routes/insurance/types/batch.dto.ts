import { IsArray, IsOptional, IsString } from "class-validator";
import CreateInsuranceRequest from "./create.dto";
import UpdateInsuranceRequest from "./update.dto";

class BatchUpdateInsuranceRequest extends UpdateInsuranceRequest {
  @IsString()
  id: string
}

export default class BatchInsuranceRequest {
  @IsOptional()
  @IsArray()
  delete?: string[]

  @IsOptional()
  @IsArray()
  update?: BatchUpdateInsuranceRequest[]

  @IsOptional()
  @IsArray()
  create?: CreateInsuranceRequest[]
}