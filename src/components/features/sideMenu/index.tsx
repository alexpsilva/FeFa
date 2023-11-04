import Link from "next/link"
import { DetailedHTMLProps, HTMLAttributes } from "react"
import MenuLogout from "./logout"
import CollapsibleSideMenu from "./collapsible"
import MenuIcon from "@/components/icons/menu"
import { twMerge } from "tailwind-merge"

interface RouteMapping {
  title: string
  path: string
}

type DivProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
interface Props {
  routes: RouteMapping[]
}

const SideMenu = ({ routes, className, ...props }: Props & DivProps) => {
  return (
    <CollapsibleSideMenu
      className={twMerge(
        `relative bg-white drop-shadow`,
        className
      )}
      logo={
        <Link
          className="text-4xl font-extrabold text-skin-selected"
          href='/'
        >
          FeFa
        </Link>
      }
      collapsed={
        <div className="p-3">
          <MenuIcon
            className="stroke-skin-selected hover:cursor-pointer"
            width="39"
            height="26"
          />
        </div>
      }
      expanded={<>
        {routes.map(route => (
          <Link
            key={route.title}
            href={route.path}
            className="
            block
            w-full px-4 py-2
            font-bold text-lg text-skin-selected 
            hover:no-underline hover:text-white hover:bg-skin-selected"
          >
            {route.title}
          </Link>
        ))}
        <MenuLogout
          className="
          absolute bottom-4 w-full
          py-2 px-4  
          text-skin-selected stroke-skin-selected
          hover:text-white hover:stroke-white hover:bg-skin-selected"
        />
      </>}
      {...props}
    />
  )
}

export default SideMenu