'use client'

import Button, { ButtonProps } from "@/components/ui/button"
import useRequestWhileLoading from "@/hooks/useRequestWhileLoading"
import request from "@/utils/request/request"
import { useRouter } from "next/navigation"
import { MouseEvent } from "react"
import { twMerge } from "tailwind-merge"


const deleteAppointment = async (appointmentId: number) => {
  return request(
    `/api/appointment/${appointmentId}`,
    { method: 'DELETE' },
  )
}

type Props = { appointmentId: number, pacientId: number } & ButtonProps
const DeleteButton = ({
  appointmentId,
  pacientId,
  onClick,
  className,
  children,
  ...props
}: Props) => {
  const router = useRouter()
  const whileLoading = useRequestWhileLoading()

  const _onClick = async (event: MouseEvent<HTMLButtonElement>) => {
    await whileLoading(
      deleteAppointment(appointmentId),
      {
        loading: 'Deletando...',
        success: 'Deletado com sucesso',
        failure: 'Falha ao deletar consulta',
      }
    )
    router.push(`/pacient/${pacientId}`)
    onClick ? onClick(event) : null
  }

  return (
    <Button
      className={twMerge(
        'bg-skin-alert text-white',
        className,
      )}
      onClick={_onClick}
      {...props}
    >
      {children}
    </Button>
  )
}

export default DeleteButton