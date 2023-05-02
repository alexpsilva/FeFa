type NotificationId =
  | 'INSURANCE_SAVE'
  | 'PACIENT_SAVE'
  | 'APPOINTMENT_SAVE'

export type { NotificationId }
export default interface Notification {
  id: NotificationId
  text: string
  type?: 'info' | 'error' | 'success'
}