'use client'

import useRequestWhileLoading from "@/hooks/useRequestWhileLoading"
import { AppointmentSchema, WritableAppointmentSchema } from "@/types/model/appointment"
import { formDataToJSON } from "@/utils/form/formDataToJSON"
import request from "@/utils/request/request"
import { DetailedHTMLProps, FormEvent, FormHTMLAttributes } from "react"

const editAppointment = async (appointmentId: number, formData: FormData) => {
  const data = WritableAppointmentSchema.omit({ pacientId: true }).parse(formDataToJSON(formData))
  return request(
    `/api/appointment/${appointmentId}`,
    {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    },
    AppointmentSchema,
  )
}

type FormProps = DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>
type Props = { appointmentId: number } & Omit<FormProps, 'onSubmit'>
const EditForm = ({ appointmentId, children, ...props }: Props) => {
  const whileLoading = useRequestWhileLoading()

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    whileLoading(
      editAppointment(
        appointmentId,
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