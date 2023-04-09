import '../styles/global.css'
import SideMenu from '@/components/side-menu'
import { AppProps } from 'next/app'

const routeMapping = [
  { title: 'Home', path: '/' },
  { title: 'Appointments', path: '/appointment' },
  { title: 'Pacients', path: '/pacient' },
  { title: 'Insurances', path: '/insurance' },
]

const CustomApp = ({ Component, pageProps, ...appProps }: AppProps) => {
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

export default CustomApp