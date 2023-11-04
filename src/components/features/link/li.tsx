'use client'

import { useRouter } from "next/navigation"
import { DetailedHTMLProps, LiHTMLAttributes } from "react"

type DivProps = Omit<DetailedHTMLProps<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>, 'onClick'>
type Props = { href: string } & DivProps

const ClientLinkLI = ({ href, children, ...props }: Props) => {
  const router = useRouter()
  const handleClick = () => router.push(href)

  return <li onClick={(handleClick)} {...props}>{children}</li>
}

export default ClientLinkLI