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
    <div className='w-screen h-screen bg-gray-50'>
      <SideMenu routes={routeMapping} />
      <main className='float-left m-2 ml-4'>
        <Component {...pageProps} />
      </main>
    </div>
  )
}

export default CustomApp