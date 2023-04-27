import Link from "next/link"
import { useRouter } from "next/router"
import LogoutIcon from "./icons/logout"

interface RouteMapping {
  title: string
  path: string
}

interface Props {
  routes: RouteMapping[]
}

const SideMenu = ({ routes }: Props) => {
  const router = useRouter()

  return (
    <div className="relative w-48 bg-gray-100 border-r-4 border-gray-300">
      <div className="
          mt-4 mb-8 text-center 
          text-3xl font-extrabold 
          text-skin-selected"
      >
        Med.FeFa
      </div>
      <div className="flex flex-col">
        {routes.map(route => {
          const selected = router.pathname.startsWith(route.path)
          return (
            <Link
              className={`
              mb-1 mx-2 px-2 py-1 rounded-lg 
              font-bold text-lg hover:no-underline
              ${selected
                  ? 'text-skin-selected bg-gray-200'
                  : 'text-skin-base hover:text-skin-selected hover:bg-gray-200'}
              `}
              href={route.path}
              key={route.title}
            >
              {route.title}
            </Link>
          )
        })}
      </div>
      <div className="absolute bottom-3 w-full">
        <div className="
          flex items-center justify-center
          mx-2 py-1 px-4 rounded-lg 
          font-bold text-lg text-skin-base stroke-skin-base
          hover:bg-gray-200 hover:text-skin-selected hover:stroke-skin-selected cursor-pointer"
        >
          Logout
          <LogoutIcon
            className='ml-4'
            width="30"
            height="22"
          />
        </div>
      </div>
    </div>
  )
}

export default SideMenu