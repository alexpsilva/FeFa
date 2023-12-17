'use client'

import useRequestWhileLoading from "@/hooks/useRequestWhileLoading"
import { PacientSchema, WritablePacientSchema } from "@/types/model/pacient"
import { formDataToJSON } from "@/utils/form/formDataToJSON"
import request from "@/utils/request/request"
import { DetailedHTMLProps, FormEvent, FormHTMLAttributes, ReactNode } from "react"

const editPacient = async (pacientId: number, formData: FormData) => {
  const data = WritablePacientSchema.parse(formDataToJSON(formData))
  return request(
    `/api/pacient/${pacientId}`,
    {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    },
    PacientSchema,
  )
}

type FormProps = DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>
type Props = { pacientId: number } & Omit<FormProps, 'onSubmit'>
const EditForm = ({ pacientId, children, ...props }: Props) => {
  const whileLoading = useRequestWhileLoading()

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    whileLoading(
      editPacient(
        pacientId,
        new FormData(event.target as HTMLFormElement),
      ),
      {
        loading: 'Salvando...',
        success: 'Salvo com sucesso',
        failure: 'Falha ao salvar alterações',
      }
    )
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