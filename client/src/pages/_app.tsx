import '../styles/global.css'
import SideMenu from '@/components/side-menu'
import { AppProps } from 'next/app'
import NotificationBanner from '@/components/features/notification/banner'
import useNotifications from '@/components/features/notification/reducer'
import { NotificationContext } from '@/components/features/notification/context'

const routeMapping = [
  { title: 'Consultas', path: '/appointment' },
  { title: 'Pacientes', path: '/pacient' },
  { title: 'Planos de Saúde', path: '/insurance' },
]

const CustomApp = ({ Component, pageProps, ...appProps }: AppProps) => {
  if (appProps.router.pathname == '/login') return <Component {...pageProps} />

  const [notifications, dispatchNotification] = useNotifications()

  return (
    <div className='flex h-screen bg-gray-50'>
      <SideMenu routes={routeMapping} />
      <main className='m-2 flex-grow'>
        <NotificationContext.Provider value={dispatchNotification}>
          <Component {...pageProps} />
          <NotificationBanner
            notifications={Array.from(notifications.values())}
          />
        </NotificationContext.Provider>
      </main>
    </div>
  )
}

export default CustomApp