'use client'

import ArrowHeadIcon from "@/components/icons/arrowHead"
import { useRouter } from "next/navigation"
import { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"
import { usePaginationContext } from "./context"

type Props = Omit<ComponentProps<typeof ArrowHeadIcon>, 'direction'>

const NextPage = ({ className, ...props }: Props) => {
  const { totalElements, pageSize, pageOffset, targetUrl } = usePaginationContext()
  const hasNextPage = pageOffset + pageSize < totalElements
  const nextPageOffset = pageOffset + pageSize

  const router = useRouter()
  const handleClick = () => router.push(targetUrl(pageSize, nextPageOffset))

  if (!hasNextPage) return null

  return <ArrowHeadIcon
    width="18"
    height="18"
    direction="right"
    onClick={handleClick}
    className={twMerge('hover:cursor-pointer', className)}
    {...props}
  />
}

export default NextPage