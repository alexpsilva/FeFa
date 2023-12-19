import { NOTIFICATION_EXPIRES_SECONDS } from "@/constants";
import { RequestResult } from "@/utils/request/types";
import { v4 as uuid } from "uuid";
import useNotificationContext from "./notifications/context";
import { Notification } from "./notifications";
import useNotify from "./notifications/useNotify";

const useRequestWhileLoading = () => {
  const { dispatch } = useNotificationContext()
  const notify = useNotify()

  const whileLoading = async <T>(
    fn: Promise<RequestResult<T>>,
    text?: {
      loading?: string,
      success?: string,
      failure?: string,
    },
    expiresInSeconds?: number,
    type?: Notification['type'],
  ) => {
    const notificationId = uuid()
    notify({
      id: notificationId,
      text: text?.loading ?? 'Carregando...',
    })

    const result = await fn

    if (result.error && text?.failure) {
      notify({
        id: notificationId,
        text: text.failure,
        expiresInSeconds: expiresInSeconds ?? NOTIFICATION_EXPIRES_SECONDS,
        type: type ?? 'error',
      })
    } else if (text?.success) {
      notify({
        id: notificationId,
        text: text.success,
        expiresInSeconds: expiresInSeconds ?? NOTIFICATION_EXPIRES_SECONDS,
        type: type ?? 'success',
      })
    } else {
      dispatch({ type: 'remove', id: notificationId })
    }

    return result
  }

  return whileLoading
}

export default useRequestWhileLoading