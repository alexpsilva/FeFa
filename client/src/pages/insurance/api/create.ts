import Insurance from "@/types/insurance"
import requestExpenseAPI from "@/utils/fetch-expense-api"

const createInsurance = (insurance: Omit<Insurance, 'id'>) => requestExpenseAPI('/insurance', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(insurance),
})

export default createInsurance