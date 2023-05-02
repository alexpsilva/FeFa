import { createContext, Dispatch, useContext } from "react";
import { NotificationAction } from "./useNotifications";

const NotificationContext = createContext<Dispatch<NotificationAction> | null>(null)

function useNotificationContext() {
  const context = useContext(NotificationContext)
  if (!context) throw new Error("NotificationContext wasn't initialized")

  return context
}

export { NotificationContext }
export default useNotificationContext