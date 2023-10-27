import '../styles/global.css'
import SideMenu from '@/components/side-menu'
import { AppProps } from 'next/app'
import NotificationBanner from '@/components/features/notification/banner'
import { NotificationContext } from '@/hooks/notifications/context'
import { useNotifications } from '@/hooks/notifications'

const routeMapping = [
  { title: 'Pacientes', path: '/pacient' },
  // { title: 'Consultas', path: '/appointment' },
  { title: 'Planos de Saúde', path: '/insurance' },
]

const CustomApp = ({ Component, pageProps, ...appProps }: AppProps) => {
  if (appProps.router.pathname == '/login') return <Component {...pageProps} />

  const [notifications, dispatchNotification] = useNotifications()

  return (
    <div className='flex h-full bg-gray-50'>
      <SideMenu
        className='flex-grow max-w-[25ch]'
        routes={routeMapping}
      />
      <main className='flex-grow overflow-auto'>
        <NotificationContext.Provider value={dispatchNotification}>
          <div>
            <Component {...pageProps} />
            <NotificationBanner
              notifications={Array.from(notifications.values())}
            />
          </div>
        </NotificationContext.Provider>
      </main>
    </div>
  )
}

export default CustomApp