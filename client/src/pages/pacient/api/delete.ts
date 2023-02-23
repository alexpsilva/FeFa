import requestExpenseAPI from "@/utils/fetch-expense-api"

const createPacient = (pacientId: string): Promise<void> => {
  return requestExpenseAPI(`/pacient/${pacientId}`, {
    method: 'DELETE',
  })
}

export default createPacient