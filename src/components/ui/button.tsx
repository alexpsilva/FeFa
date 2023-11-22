import Link from "next/link"
import React, { ButtonHTMLAttributes, ComponentProps, DetailedHTMLProps } from "react"
import { twMerge } from "tailwind-merge"

type ButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
type Props = { type?: ButtonProps['type'], href?: never } & Omit<ButtonProps, 'type'>
  | { type: 'link', href: ComponentProps<typeof Link>['href'] } & Omit<ButtonProps, 'type'>

const Button = ({ children, type, href, ...props }: Props) => {
  props.className = twMerge(
    "px-4 py-1 min-w-[12ch] bg-white drop-shadow-md rounded cursor-pointer",
    props.className
  )

  if (type === 'link') {
    return <Link href={href} passHref>
      <button
        type='button'
        {...props}
      >
        {children}
      </button>
    </Link>
  }

  return <button
    type={type || "button"}
    {...props}
  >
    {children}
  </button>
}

export default Button