import '../styles/global.css'
import SideMenu from '@/components/side-menu'
import { AppProps } from 'next/app'

const routeMapping = [
  { title: 'Consultas', path: '/appointment' },
  { title: 'Pacientes', path: '/pacient' },
  { title: 'Planos de Saúde', path: '/insurance' },
]

const CustomApp = ({ Component, pageProps, ...appProps }: AppProps) => {
  if (appProps.router.pathname == '/login') return <Component {...pageProps} />

  return (
    <div className='flex h-screen bg-gray-50'>
      <SideMenu routes={routeMapping} />
      <main className='m-2 flex-grow'>
        <Component {...pageProps} />
      </main>
    </div>
  )
}

export default CustomApp