import Pacient, { PacientToCreate } from "@/types/pacient"
import requestExpenseAPI from "@/utils/fetch-expense-api"

const updatePacient = (pacient: PacientToCreate): Promise<Pacient> => {
  const params = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(pacient),
  }

  return requestExpenseAPI(`/pacient/${pacient.id}`, params)
}

export default updatePacient