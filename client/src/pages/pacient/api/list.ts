import Pacient from "@/types/pacient"
import requestExpenseAPI from "@/utils/fetch-expense-api"

const listPacients = (): Promise<Pacient[]> => requestExpenseAPI('/pacient', { method: 'GET' })

export default listPacients