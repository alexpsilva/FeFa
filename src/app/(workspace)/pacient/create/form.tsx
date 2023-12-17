'use client'

import { PacientSchema, WritablePacientSchema } from "@/types/model/pacient"
import request from "@/utils/request/request"
import { useRouter } from "next/navigation"
import { DetailedHTMLProps, FormEvent, FormHTMLAttributes, ReactNode } from "react"

const createPacient = async (formData: FormData) => {
  const data = WritablePacientSchema.parse(Object.fromEntries(formData))
  const { response, error } = await request(
    `/api/pacient`,
    {
      method: 'POST',
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
const CreateForm = ({ children, ...props }: Props) => {
  const router = useRouter()

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const pacient = await createPacient(new FormData(event.target as HTMLFormElement))
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

export default CreateForm