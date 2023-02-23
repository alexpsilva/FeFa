import Insurance from "@/types/insurance"
import requestExpenseAPI from "@/utils/fetch-expense-api"

const updateInsurance = (insurance: Insurance) => requestExpenseAPI(`/insurance/${insurance.id}`, {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(insurance),
})

export default updateInsurance