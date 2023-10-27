import { RequestResult } from "@/utils/requestFromClient";
import { v4 as uuid } from "uuid";
import useNotifications from "./notifications/context";
import useNotify from "./notifications/useNotify";

export default function useRequestWhileLoading() {
  const { dispatch } = useNotifications()
  const notify = useNotify()

  return async <T>(
    fn: () => Promise<RequestResult<T>>,
    text?: {
      loading?: string,
      success?: string,
      failure?: string,
    },
    expiresInSeconds?: number,
  ) => {
    const notificationId = uuid()
    notify({
      id: notificationId,
      text: text?.loading ?? 'Carregando...',
    })

    const result = await fn()

    if (result.error && text?.failure) {
      notify({
        id: notificationId,
        text: text.failure,
        expiresInSeconds: expiresInSeconds ?? 3,
      })
    } else if (text?.success) {
      notify({
        id: notificationId,
        text: text.success,
        expiresInSeconds: expiresInSeconds ?? 3,
      })
    } else {
      dispatch({ type: 'remove', id: notificationId })
    }

    return result
  }
}