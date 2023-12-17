'use client'

import ArrowHeadIcon from "@/components/icons/arrowHead"
import Link from "next/link"
import { ComponentProps } from "react"
import { usePaginationContext } from "./context"

type Props = Omit<ComponentProps<typeof ArrowHeadIcon>, 'direction'>

const NextPage = (props: Props) => {
  const { totalElements, pageSize, pageOffset, targetUrl } = usePaginationContext()
  const hasNextPage = pageOffset + pageSize < totalElements
  const nextPageOffset = pageOffset + pageSize
  const nextPageUrl = targetUrl(pageSize, nextPageOffset)

  if (!hasNextPage) return null

  return <Link href={nextPageUrl}>
    <ArrowHeadIcon
      width="18"
      height="18"
      direction="right"
      {...props}
    />
  </Link>
}

export default NextPage