import '../styles/global.css'
import SideMenu from '@/components/side-menu'

const routeMapping = [
  { title: 'Home', path: '/' },
  { title: 'Appointments', path: '/appointment' },
  { title: 'Pacients', path: '/pacient' },
  { title: 'Insurances', path: '/insurance' },
]

export default function App({ Component, pageProps, ...appProps }) {

  if (appProps.router.pathname == '/login') return <Component {...pageProps} />

  return (
    <>
      <SideMenu routes={routeMapping} width="200px" />
      <div style={{ marginLeft: "200px", paddingLeft: "15px", marginTop: "30px" }}>
        <Component {...pageProps} />
      </div>
    </>
  )
}