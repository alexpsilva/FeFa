import Link from "next/link"

interface RouteMapping {
  title: string
  path: string
}

interface Props {
  routes: RouteMapping[]
}

const SideMenu = ({ routes }: Props) => (
  <div className="relative w-48 bg-gray-100">
    {routes.map(route => (
      <Link
        className="block w-full py-1 px-3 font-bold text-gray-600
          hover:text-cyan-700 hover:bg-gray-200 hover:no-underline"
        href={route.path}
        key={route.title}
      >
        {route.title}
      </Link>
    ))}
    <div className="absolute bottom-0 block w-full mb-0 mt-auto px-3 py-1
       bg-gray-800 text-cyan-500 font-bold">
      Lock?
    </div>
  </div>
)

export default SideMenu