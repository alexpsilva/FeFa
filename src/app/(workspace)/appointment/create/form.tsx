'use client'

import { AppointmentSchema, WritableAppointmentSchema } from "@/types/model/appointment"
import requestFromClient from "@/utils/request/fromClient"
import { useRouter } from "next/navigation"
import React, { DetailedHTMLProps, FormEvent, FormHTMLAttributes, ReactNode } from "react"

const createAppointment = async (formData: FormData) => {
  const data = WritableAppointmentSchema.parse(Object.fromEntries(formData))
  const { response, error } = await requestFromClient(
    '/api/appointment',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    },
    AppointmentSchema
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
    const appointment = await createAppointment(new FormData(event.target as HTMLFormElement))
    router.push(`/appointment/${appointment.id}`)
  }

  return <form
    onSubmit={onSubmit}
    {...props}
  >
    {children}
  </form>
}

export default CreateForm