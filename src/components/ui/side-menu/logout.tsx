import Link from "next/link"
import React from "react"
import LogoutIcon from "../../icons/logout"

const MenuLogout = () => {
  return <Link className="
    flex items-center justify-center
    py-1 px-4 gap-4 
    rounded-lg hover:bg-gray-200 
    text-skin-base stroke-skin-base
    hover:text-skin-selected hover:stroke-skin-selected 
    cursor-pointer"
    href={'/logout'}
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