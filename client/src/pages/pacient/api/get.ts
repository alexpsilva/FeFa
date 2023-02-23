import Pacient from "@/types/pacient"
import requestExpenseAPI from "@/utils/fetch-expense-api"

const getPacient = (pacientId: string): Promise<Pacient> => {
  return requestExpenseAPI(`/pacient/${pacientId}`, { method: 'GET' })
}

export default getPacient