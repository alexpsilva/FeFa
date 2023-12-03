import NotificationBanners from "@/components/features/notification/banner"
import { NotificationProvider } from "@/hooks/notifications"
import { Metadata } from "next"

import './global.css'

export const metadata: Metadata = {
  title: 'FefaCare',
  description: 'A homemade pacient management plataform',
  creator: 'Alexandre de Paiva Silva',
  icons: { icon: '/favicon.ico' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <NotificationProvider>
        <body>
          {children}
          <aside className="fixed bottom-0 right-3">
            <NotificationBanners />
          </aside>
        </body>
      </NotificationProvider>
    </html>
  )
}