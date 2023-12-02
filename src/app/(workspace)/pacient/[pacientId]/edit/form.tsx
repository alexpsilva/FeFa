'use client'

import { PacientSchema, WritablePacientSchema } from "@/types/model/pacient"
import { formDataToJSON } from "@/utils/form/formDataToJSON"
import requestFromClient from "@/utils/request/fromClient"
import { useRouter } from "next/navigation"
import { DetailedHTMLProps, FormEvent, FormHTMLAttributes, ReactNode } from "react"

const editPacient = async (formData: FormData) => {
  const data = WritablePacientSchema.parse(formDataToJSON(formData))
  const { response, error } = await requestFromClient(
    `/api/pacient`,
    {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    },
    PacientSchema,
  )

  if (error) { throw new Error(error.message) }
  return response
}

type FormProps = DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>
type Props = { children: ReactNode } & Omit<FormProps, 'onSubmit'>
const EditForm = ({ children, ...props }: Props) => {
  const router = useRouter()

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const pacient = await editPacient(new FormData(event.target as HTMLFormElement))
    router.push(`/pacient/${pacient.id}`)
  }

  return (
    <form
      onSubmit={onSubmit}
      {...props}
    >
      {children}
    </form>
  )
}

export default EditForm