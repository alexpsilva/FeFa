import CrossIcon from "@/components/icons/cross"
import { Notification } from "@/hooks/notifications"
import useNotificationContext from "@/hooks/notifications/context"

interface Props {
  notifications: Notification[]
}

const NotificationBanner = ({ notifications }: Props) => {
  const dispatch = useNotificationContext()

  return (
    <div className="fixed bottom-0 right-3">
      {notifications.map((notification, index) => (
        <div
          key={index}
          className="
            flex justify-end items-center
            mb-3 px-3 py-1 leading-loose
          bg-slate-300 font-medium"
        >
          <div>
            {notification.text}
          </div>
          <CrossIcon
            width='22'
            height='22'
            className='ml-2 stroke-black cursor-pointer'
            onClick={() => dispatch({ type: "remove", id: notification.id })}
          />
        </div>
      ))}
    </div>
  )
}

export default NotificationBanner