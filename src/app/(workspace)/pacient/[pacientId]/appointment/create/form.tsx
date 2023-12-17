'use client'

import useRequestWhileLoading from "@/hooks/useRequestWhileLoading"
import { AppointmentSchema, WritableAppointmentWithPacientIdSchema } from "@/types/model/appointment"
import request from "@/utils/request/request"
import { useRouter } from "next/navigation"
import { DetailedHTMLProps, FormEvent, FormHTMLAttributes, ReactNode } from "react"

const createAppointment = async (pacientId: number, formData: FormData) => {
  const data = WritableAppointmentWithPacientIdSchema.parse({
    ...Object.fromEntries(formData),
    pacientId
  })

  return request(
    `/api/appointment`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    },
    AppointmentSchema,
  )
}

type FormProps = DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>
type Props = { pacientId: number, children: ReactNode } & Omit<FormProps, 'onSubmit'>
const CreateForm = ({ pacientId, children, ...props }: Props) => {
  const router = useRouter()
  const whileLoading = useRequestWhileLoading()

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const { response, error } = await whileLoading(
      createAppointment(
        pacientId,
        new FormData(event.target as HTMLFormElement)
      ),
      {
        loading: 'Salvando...',
        success: 'Criado com sucesso',
        failure: 'Falha ao criar consulta',
      }
    )

    if (error) { throw new Error(error.message) }
    router.push(`/pacient/${pacientId}/appointment/${response.id}`)
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