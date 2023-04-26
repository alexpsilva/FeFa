type NotificationId =
  | 'INSURANCE_SAVED'

export type { NotificationId }
export default interface Notification {
  id: NotificationId
  text: string
  type?: 'info' | 'error' | 'success'
}