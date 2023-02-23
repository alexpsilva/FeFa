import requestExpenseAPI from "@/utils/fetch-expense-api"

const listInsurances = () => requestExpenseAPI('/insurance', {
  method: 'GET',
})

export default listInsurances