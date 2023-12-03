'use client'

import CrossIcon from "@/components/icons/cross"
import { useNotificationContext } from "@/hooks/notifications"


const NotificationBanners = () => {
  const { notifications, dispatch } = useNotificationContext()
  const notificationsArray = Array.from(notifications.values())

  return (
    <>
      {notificationsArray.map((notification, index) => (
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
    </>
  )
}

export default NotificationBanners