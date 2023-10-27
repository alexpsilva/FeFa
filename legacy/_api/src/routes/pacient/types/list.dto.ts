import { IsNumberString, IsOptional, IsString } from "class-validator"
import 'reflect-metadata'
import { PAGINATION_PAGE_SIZE_LIMIT } from "../../../utils/env"
import { MaxNumberString } from "../../../validators/max-number-string"
import { MinNumberString } from "../../../validators/min-number-string"

class ListPacientQuery {
  @IsString()
  @IsOptional()
  name?: string

  @MinNumberString(0)
  @IsNumberString()
  @IsOptional()
  pageOffset?: string

  @MinNumberString(1)
  @MaxNumberString(PAGINATION_PAGE_SIZE_LIMIT)
  @IsNumberString()
  @IsOptional()
  pageSize?: string
}

export { ListPacientQuery }