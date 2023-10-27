import Appointment from "@/types/model/appointment";
import Pacient from "@/types/model/pacient";
import { createContext, useContext } from "react";

const PacientSheetContext = createContext<{
  pacient: Partial<Pacient>
  setPacient: (newData: Partial<Pacient>) => void
  appointments?: Appointment[]
} | null>(null)

export function usePacientSheetContext() {
  const context = useContext(PacientSheetContext)
  if (!context) {
    throw new Error(
      "PacientSheet.* component must be a child of PacientSheet component"
    )
  }
  return context
}

export default PacientSheetContext