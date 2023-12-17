'use client'

import ArrowHeadIcon from "@/components/icons/arrowHead"
import Link from "next/link"
import { ComponentProps } from "react"
import { usePaginationContext } from "./context"

type Props = Omit<ComponentProps<typeof ArrowHeadIcon>, 'direction'>

const PreviousPage = (props: Props) => {
  const { pageSize, pageOffset, targetUrl } = usePaginationContext()
  const hasPreviousPage = pageOffset > 0
  const previousPageOffset = Math.max(0, pageOffset - pageSize)
  const previousPageUrl = targetUrl(pageSize, previousPageOffset)

  if (!hasPreviousPage) return null

  return <Link href={previousPageUrl}>
    <ArrowHeadIcon
      width="18"
      height="18"
      direction="left"
      {...props}
    />
  </Link>
}

export default PreviousPage