'use client'

import ArrowHeadIcon from "@/components/icons/arrowHead"
import { useRouter } from "next/navigation"
import { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"
import { usePaginationContext } from "./context"

type Props = Omit<ComponentProps<typeof ArrowHeadIcon>, 'direction'>

const PreviousPage = ({ className, ...props }: Props) => {
  const { pageSize, pageOffset, targetUrl } = usePaginationContext()
  const hasPreviousPage = pageOffset > 0
  const previousPageOffset = Math.max(0, pageOffset - pageSize)

  const router = useRouter()
  const handleClick = () => router.push(targetUrl(pageSize, previousPageOffset))

  if (!hasPreviousPage) return null

  return <ArrowHeadIcon
    width="18"
    height="18"
    direction="left"
    onClick={handleClick}
    className={twMerge('hover:cursor-pointer', className)}
    {...props}
  />
}

export default PreviousPage