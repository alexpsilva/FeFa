import useNotificationContext from "./context"
import Notification, { NotificationId } from "./type"

const timeouts = new Map<NotificationId, NodeJS.Timeout>()
const useNotify = () => {
  const dispatch = useNotificationContext()

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

export default useNotify