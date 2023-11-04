'use client'

import { useRouter } from "next/navigation"
import { DetailedHTMLProps, HTMLAttributes } from "react"

type DivProps = Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'onClick'>
type Props = { href: string } & DivProps

const ClientLink = ({ href, children, ...props }: Props) => {
  const router = useRouter()
  const handleClick = () => router.push(href)

  return <div onClick={(handleClick)} {...props}>{children}</div>
}

export default ClientLink