import { createContext, Dispatch, useContext } from "react";
import { Notification, NotificationAction } from "./reducer";
import { NotificationId } from "./type";

const NotificationContext = createContext<Dispatch<NotificationAction> | null>(null)

function useNotificationDispatch() {
  const context = useContext(NotificationContext)
  if (!context) throw new Error("NotificationContext wasn't initialized")

  return context
}

const timeouts = new Map<NotificationId, NodeJS.Timeout>()
const useNotify = () => {
  const dispatch = useNotificationDispatch()

  return (payload: Notification & { expiresInSeconds?: number }) => {
    const { expiresInSeconds, ...notification } = payload

    dispatch({ type: 'add', payload: notification })
    if (expiresInSeconds) {
      const currentTimeout = timeouts.get(notification.id)
      if (currentTimeout) { clearTimeout(currentTimeout) }

      timeouts.set(
        notification.id,
        setTimeout(
          () => dispatch({ type: 'remove', id: notification.id }),
          expiresInSeconds * 1000
        )
      )
    }
  }
}

export { NotificationContext, useNotificationDispatch }
export default useNotify