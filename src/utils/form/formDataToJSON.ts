import * as qs from 'qs'

export function formDataToJSON(formData: FormData) {
  // @ts-ignore
  const searchParams = new URLSearchParams(formData)
  return qs.parse(searchParams.toString())
}