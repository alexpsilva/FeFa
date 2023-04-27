import { Reducer, useReducer } from "react";
import Notification, { NotificationId } from "./type";

type NotificationAction =
  | { type: 'add', payload: Notification }
  | { type: 'update', payload: Notification }
  | { type: 'remove', id: NotificationId }
  | { type: 'clear' }

type NotificationState = Map<string, Notification>

const reducer = (
  state: NotificationState,
  action: NotificationAction
): NotificationState => {
  const { type } = action
  switch (type) {
    case 'add':
    case 'update': {
      const notification: Notification = {
        ...action.payload,
        type: action.payload.type || 'info'
      }

      const nextState = new Map(state)
      nextState.set(notification.id, notification)
      return nextState
    }
    case 'remove': {
      const nextState = new Map(state)
      nextState.delete(action.id)
      return nextState
    }
    case 'clear': return new Map()
  }
}

const useNotifications = () => useReducer<Reducer<NotificationState, NotificationAction>>(
  reducer,
  new Map()
)

export type { NotificationAction, NotificationState, Notification }
export default useNotifications