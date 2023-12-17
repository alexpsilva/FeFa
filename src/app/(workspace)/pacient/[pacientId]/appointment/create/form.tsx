'use client'

import { AppointmentSchema, WritableAppointmentWithPacientIdSchema } from "@/types/model/appointment"
import request from "@/utils/request/request"
import { useRouter } from "next/navigation"
import { DetailedHTMLProps, FormEvent, FormHTMLAttributes, ReactNode } from "react"

const createAppointment = async (pacientId: number, formData: FormData) => {
  const data = WritableAppointmentWithPacientIdSchema
    .parse({
      ...Object.fromEntries(formData),
      pacientId
    })
  const { response, error } = await request(
    `/api/appointment`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    },
    AppointmentSchema,
  )

  if (error) { throw new Error(error.message) }
  return response
}

type FormProps = DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>
type Props = { pacientId: number, children: ReactNode } & Omit<FormProps, 'onSubmit'>
const CreateForm = ({ pacientId, children, ...props }: Props) => {
  const router = useRouter()

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const appointment = await createAppointment(
      pacientId,
      new FormData(event.target as HTMLFormElement)
    )
    router.push(`/pacient/${pacientId}/appointment/${appointment.id}`)
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