import HTMLButtonProps from "@/types/html-props/button"
import Link from "next/link"
import React, { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"

type LinkButtonProps = { type: 'link', href: ComponentProps<typeof Link>['href'] } & Omit<HTMLButtonProps, 'type'>
type DefaultButtonProps = { type?: HTMLButtonProps['type'], href?: never } & Omit<HTMLButtonProps, 'type'>
type ButtonProps = DefaultButtonProps | LinkButtonProps

const Button = ({ children, type, href, ...props }: ButtonProps) => {
  props.className = twMerge(
    "px-4 py-1 min-w-[12ch] bg-white drop-shadow-md rounded cursor-pointer",
    props.className
  )

  if (type === 'link') {
    return <Link href={href} passHref>
      <button
        type={'button'}
        {...props}
      >
        {children}
      </button>
    </Link>
  }

  return <button
    type={type || 'button'}
    {...props}
  >
    {children}
  </button>
}

export default Button
export type { ButtonProps }