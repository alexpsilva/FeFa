import Link from "next/link"
import { DetailedHTMLProps, HTMLAttributes } from "react"
import MenuLogout from "./logout"
import MenuItem from "./item"

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
    <nav className={`
      relative py-2
      bg-gray-100 
      border-r-2 border-gray-300 ${className}`}
      {...props}
    >
      <div className="pt-4 pb-8 text-center">
        <Link
          className="text-3xl font-extrabold text-skin-selected"
          href='/workspace'
        >
          Med.FeFa
        </Link>
      </div>
      <ul>
        {routes.map(route => (
          <li key={route.title} className="px-2">
            <MenuItem
              text={route.title}
              href={route.path}
            />
          </li>
        ))}
      </ul>
      <div className="absolute bottom-0 w-full p-2">
        <MenuLogout />
      </div>
    </nav>
  )
}

export default SideMenu