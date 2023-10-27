'use client'

import { NotificationContext } from "./context"
import useNotificationsReducer from "./reducer"

export default function NotificationProvider({
  children
}: {
  children: React.ReactNode
}) {
  const [notifications, dispatch] = useNotificationsReducer()

  return (
    <NotificationContext.Provider value={{ notifications, dispatch }}>
      {children}
    </NotificationContext.Provider>
  )
}