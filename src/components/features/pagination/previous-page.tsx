'use client'

import ArrowIcon from "@/components/icons/arrow"
import Link from "next/link"
import { ComponentProps } from "react"
import { usePaginationContext } from "./context"

type Props = Omit<ComponentProps<typeof Link>, 'href' | 'hidden'>

const PreviousPage = (props: Props) => {
  const { pageSize, pageOffset, targetUrl } = usePaginationContext()
  const hasPreviousPage = pageOffset > 0
  const previousPageOffset = Math.max(0, pageOffset - pageSize)

  return <Link
    href={targetUrl(pageSize, previousPageOffset)}
    hidden={!hasPreviousPage}
    {...props}
  >
    <ArrowIcon
      width="18"
      height="18"
      direction="left"
    />
  </Link>
}

export default PreviousPage