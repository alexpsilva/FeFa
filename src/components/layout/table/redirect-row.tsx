'use client'

import { useRouter } from "next/navigation"
import { DetailedHTMLProps, HTMLAttributes } from "react"

type TableRowProps = DetailedHTMLProps<HTMLAttributes<HTMLTableRowElement>, HTMLTableRowElement>
type Props = { href: string } & Omit<TableRowProps, 'onClick'>

const RedirectRow = ({ href, children, ...props }: Props) => {
  const router = useRouter()
  const onClickHandler = () => router.push(href)

  return (
    <tr onClick={onClickHandler} {...props}>
      {children}
    </tr>
  )
}

export default RedirectRow