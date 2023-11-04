import Link from "next/link"
import React, { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"
import LogoutIcon from "../../icons/logout"

type Props = Omit<ComponentProps<typeof Link>, 'href'>

const MenuLogout = ({ className, ...props }: Props) => {
  return <Link className={twMerge(
    `flex items-center justify-center gap-4`,
    className
  )}
    href={'/logout'}
    {...props}
  >
    <span className="font-bold text-lg">
      Logout
    </span>
    <LogoutIcon
      width="30"
      height="22"
    />
  </Link>
}

export default MenuLogout