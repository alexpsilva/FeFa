import { createContext, Dispatch, useContext } from "react";
import { NotificationAction } from "./reducer";

const NotificationContext = createContext<Dispatch<NotificationAction> | null>(null)

export function useDispatchNotification() {
  const context = useContext(NotificationContext)
  if (!context) throw new Error("NotificationContext wasn't initialized")

  return context
}

export { NotificationContext }
export default useDispatchNotification