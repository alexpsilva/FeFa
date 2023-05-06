export default interface Notification {
  id: string
  text: string
  type?: 'info' | 'error' | 'success'
}