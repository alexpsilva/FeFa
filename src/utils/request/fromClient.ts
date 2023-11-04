import { TypeOf, z } from "zod"
import request from "./request"
import { RequestOptions, RequestResult } from "./types"

const requestFromClient = async <T extends z.ZodTypeAny>(
  path: string,
  options?: RequestOptions,
  schema?: T,
): Promise<RequestResult<TypeOf<T>>> => {
  console.log('requestFromClient')
  return request(path, options, schema)
}

export default requestFromClient