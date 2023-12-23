'use client'

import Button, { ButtonProps } from "@/components/ui/button"
import useRequestWhileLoading from "@/hooks/useRequestWhileLoading"
import request from "@/utils/request/request"
import { useRouter } from "next/navigation"
import { MouseEvent } from "react"
import { twMerge } from "tailwind-merge"

const deletePacient = async (pacientId: number) => {
  return request(
    `/api/pacient/${pacientId}`,
    { method: 'DELETE' },
  )
}

type Props = { pacientId: number } & ButtonProps
const DeleteButton = ({ pacientId, onClick, className, children, ...props }: Props) => {
  const router = useRouter()
  const whileLoading = useRequestWhileLoading()

  const _onClick = async (event: MouseEvent<HTMLButtonElement>) => {
    await whileLoading(
      deletePacient(pacientId),
      {
        loading: 'Deletando...',
        success: 'Deletado com sucesso',
        failure: 'Falha ao deletar paciente',
      }
    )
    router.push('/pacient')
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