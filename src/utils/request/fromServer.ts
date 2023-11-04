import { headers } from "next/headers"
import { TypeOf, z } from "zod"
import request from "./request"
import { RequestOptions, RequestResult } from "./types"

const requestFromServer = async <T extends z.ZodTypeAny>(
  path: string,
  options?: RequestOptions,
  schema?: T,
): Promise<RequestResult<TypeOf<T>>> => {
  console.log('requestFromServer')
  return request(
    path,
    {
      ...options,
      headers: headers(),
    },
    schema
  )
}

export default requestFromServer