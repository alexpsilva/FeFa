'use client'

import TrashIcon from "@/components/icons/trash"
import useRequestWhileLoading from "@/hooks/useRequestWhileLoading"
import requestFromClient from "@/utils/request/fromClient"
import { useRouter } from "next/navigation"
import { ComponentProps } from "react"

const deleteAppointment = async (appointmentId: number) => {
  return requestFromClient(
    `/api/appointment/${appointmentId}`,
    { method: 'DELETE' },
  )
}

type IconProps = ComponentProps<typeof TrashIcon>
type Props = { appointmentId: number, pacientId: number } & Omit<IconProps, 'onClick'>
const DeleteButton = ({ appointmentId, pacientId, ...props }: Props) => {
  const router = useRouter()
  const whileLoading = useRequestWhileLoading()

  const onClick = async () => {
    await whileLoading(
      deleteAppointment(appointmentId),
      {
        loading: 'Deletando...',
        success: 'Deletado com sucesso',
        failure: 'Falha ao deletar consulta',
      }
    )
    router.push(`/pacient/${pacientId}`)
  }

  return (
    <TrashIcon
      width="21"
      height="21"
      className="stroke-skin-selected cursor-pointer"
      onClick={onClick}
      {...props}
    />
  )
}

export default DeleteButton