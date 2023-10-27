import { headers } from "next/headers"
import { TypeOf, z } from "zod"
import requestFromClient from "./fromClient"
import { RequestOptions, RequestResult } from "./types"

const requestFromServer = async <T extends z.ZodTypeAny>(
  path: string,
  schema: T | null,
  options?: RequestOptions
): Promise<RequestResult<null extends T ? null : TypeOf<T>>> => {
  return requestFromClient(path, schema, {
    ...options,
    headers: headers(),
  })
}

export default requestFromServer