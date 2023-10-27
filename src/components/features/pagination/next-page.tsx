'use client'

import ArrowIcon from "@/components/icons/arrow"
import Link from "next/link"
import { ComponentProps } from "react"
import { usePaginationContext } from "./context"

type Props = Omit<ComponentProps<typeof Link>, 'href' | 'hidden'>

const NextPage = (props: Props) => {
  const { totalElements, pageSize, pageOffset, targetUrl } = usePaginationContext()
  const hasNextPage = pageOffset + pageSize < totalElements
  const nextPageOffset = pageOffset + pageSize

  return <Link
    href={targetUrl(pageSize, nextPageOffset)}
    hidden={!hasNextPage}
    {...props}
  >
    <ArrowIcon
      width="18"
      height="18"
      direction="right"
    />
  </Link>
}

export default NextPage