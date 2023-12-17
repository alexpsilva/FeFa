'use client'

import useRequestWhileLoading from "@/hooks/useRequestWhileLoading"
import { PacientSchema, WritablePacientSchema } from "@/types/model/pacient"
import request from "@/utils/request/request"
import { useRouter } from "next/navigation"
import { DetailedHTMLProps, FormEvent, FormHTMLAttributes, ReactNode } from "react"

const createPacient = async (formData: FormData) => {
  const data = WritablePacientSchema.parse(Object.fromEntries(formData))
  return request(
    `/api/pacient`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    },
    PacientSchema,
  )
}

type FormProps = DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>
type Props = { children: ReactNode } & Omit<FormProps, 'onSubmit'>
const CreateForm = ({ children, ...props }: Props) => {
  const router = useRouter()
  const whileLoading = useRequestWhileLoading()

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const { response, error } = await whileLoading(
      createPacient(new FormData(event.target as HTMLFormElement)),
      {
        loading: 'Salvando...',
        success: 'Criado com sucesso',
        failure: 'Falha ao criar paciente',
      }
    )

    if (error) { throw new Error(error.message) }
    router.push(`/pacient/${response.id}`)
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