import '../styles/global.css'
import SideMenu from '@/components/side-menu'

const routeMapping = [
  { title: 'Home', path: '/' },
  { title: 'Insurances', path: '/insurance' },
  { title: 'Pacients', path: '/pacient' },
]

export default function App({ Component, pageProps }) {
  return (
    <>
      <SideMenu routes={routeMapping} width="200px" />
      <div style={{ marginLeft: "200px", paddingLeft: "15px", marginTop: "30px" }}>
        <Component {...pageProps} />
      </div>
    </>
  )
}