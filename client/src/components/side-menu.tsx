import Link from "next/link"

interface RouteMapping {
  title: string
  path: string
}

interface Props {
  routes: RouteMapping[]
  width: string
}

const SideMenu = ({ routes, width }: Props) => (
  <div style={{ display: 'block', width: width, height: '100%', position: 'fixed', top: 0, bottom: 0, left: 0, border: '2px solid black' }} >
    {routes.map(route => (
      <div key={route.title} style={{ width: '100%', float: 'left', borderBottom: '2px solid black' }}>
        <Link href={route.path}>{route.title}</Link>
      </div>
    ))}
  </div>
)

export default SideMenu