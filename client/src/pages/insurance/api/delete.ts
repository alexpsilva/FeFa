import requestExpenseAPI from "@/utils/fetch-expense-api"

const deleteInsurance = (id: string) => requestExpenseAPI(`/insurance/${id}`, {
  method: 'DELETE',
})

export default deleteInsurance