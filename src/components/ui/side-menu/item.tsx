'use client'

import Link, { LinkProps } from "next/link"
import { usePathname } from "next/navigation"
import React from "react"

interface Props {
  text: string
  href: LinkProps['href']
}

const MenuItem = ({ text, href }: Props) => {
  const pathname = usePathname()

  return <Link
    className={`
      block w-full
      py-1 px-2 rounded-lg 
      font-bold text-lg hover:no-underline
      ${pathname.startsWith(String(href))
        ? 'text-skin-selected bg-gray-200'
        : 'text-skin-base hover:text-skin-selected hover:bg-gray-200'}
    `}
    href={href}
  >
    {text}
  </Link>
}

export default MenuItem