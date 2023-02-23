import Pacient, { PacientToCreate } from "@/types/pacient"
import requestExpenseAPI from "@/utils/fetch-expense-api"

const createPacient = (pacient: PacientToCreate): Promise<Pacient> => {
  const params = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(pacient),
  }

  return requestExpenseAPI(`/pacient`, params)
}

export default createPacient