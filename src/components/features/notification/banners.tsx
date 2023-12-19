'use client'

import CrossIcon from "@/components/icons/cross"
import ContentCard from "@/components/layout/contentCard"
import { Notification, useNotificationContext } from "@/hooks/notifications"
import { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"

type BannerProps = {
  notification: Notification,
  onClose: (id: Notification['id']) => void,
} & ComponentProps<typeof ContentCard>

const NotificationBanner = ({ notification, onClose, className, ...props }: BannerProps) => {
  const bgColor = notification.type == 'info'
    ? 'bg-white'
    : notification.type == 'success'
      ? 'bg-skin-selected'
      : 'bg-skin-alert'

  const textColor = notification.type == 'info'
    ? 'text-skin-base'
    : 'text-white'

  const strokeColor = notification.type == 'info'
    ? 'stroke-skin-selected'
    : 'stroke-white'

  return (
    <ContentCard
      className={twMerge(
        ` py-3 px-5
        flex justify-end items-center gap-3
        ${bgColor} ${textColor} ${strokeColor}`,
        className,
      )}
      {...props}
    >
      {notification.text}
      <CrossIcon
        width='22'
        height='22'
        className='stroke-2 cursor-pointer'
        onClick={() => onClose(notification.id)}
      />
    </ContentCard>
  )
}


const NotificationBanners = () => {
  const { notifications, dispatch } = useNotificationContext()
  const notificationsArray = Array.from(notifications.values())

  return (
    <div className="py-5 px-3 flex flex-col gap-3">
      {notificationsArray.map((notification, index) => (
        <NotificationBanner
          key={index}
          notification={notification}
          onClose={(id) => dispatch({ type: "remove", id })}
        />
      ))}
    </div>
  )
}

export default NotificationBanners