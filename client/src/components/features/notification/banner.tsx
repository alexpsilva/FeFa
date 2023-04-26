import useDispatchNotification from "./context"
import Notification from "./type"

interface Props {
  notifications: Notification[]
}

const NotificationBanner = ({ notifications }: Props) => {
  const dispatchNotification = useDispatchNotification()

  return (
    <div className="fixed bottom-0 right-3">
      {notifications.map((notification, index) => (
        <div key={index} className="mb-3 bg-slate-400 leading-loose font-medium">
          {notification.text}
        </div>
      ))}
    </div>
  )
}

export default NotificationBanner