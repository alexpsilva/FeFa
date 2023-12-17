'use client'

import TrashIcon from "@/components/icons/trash"
import useRequestWhileLoading from "@/hooks/useRequestWhileLoading"
import request from "@/utils/request/request"
import { useRouter } from "next/navigation"
import { ComponentProps } from "react"

const deletePacient = async (pacientId: number) => {
  return request(
    `/api/pacient/${pacientId}`,
    { method: 'DELETE' },
  )
}

type IconProps = ComponentProps<typeof TrashIcon>
type Props = { pacientId: number } & Omit<IconProps, 'onClick'>
const DeleteButton = ({ pacientId, ...props }: Props) => {
  const router = useRouter()
  const whileLoading = useRequestWhileLoading()

  const onClick = async () => {
    await whileLoading(
      deletePacient(pacientId),
      {
        loading: 'Deletando...',
        success: 'Deletado com sucesso',
        failure: 'Falha ao deletar paciente',
      }
    )
    router.push('/pacient')
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