import { RequestResult } from "@/utils/request";
import { v4 as uuid } from "uuid";
import useNotify from "./notifications/useNotify";

export default function useRequestWhileLoading() {
  const notify = useNotify()

  return async (
    fn: () => Promise<RequestResult>,
    successText?: string,
    failureText?: string,
    expiresInSeconds?: number,
  ) => {
    const notificationId = uuid()
    notify({ id: notificationId, text: 'Carregando...' })

    const result = await fn()

    if (result.error) {
      notify({
        id: notificationId,
        text: failureText ?? 'Falhou',
        expiresInSeconds: expiresInSeconds ?? 3,
      })
    } else {
      notify({
        id: notificationId,
        text: successText ?? 'Sucesso',
        expiresInSeconds: expiresInSeconds ?? 3,
      })
    }

    return result
  }
}