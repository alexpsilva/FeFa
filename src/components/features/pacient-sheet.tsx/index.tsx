import Pacient from "@/types/model/pacient"
import Appointment from "@/types/model/appointment"

import MultitabFrame from "@/components/layout/multitab-frame"
import TabItem from "@/components/layout/multitab-frame/tab-item"

import PacientSheetContext from "./context"
import PacientSheetHistory from "./history"
import PacientSheetPersonalData from "./personal-data"
import PacientSheetContact from "./contact"

interface Props {
  pacient: Partial<Pacient>
  setPacient: (newData: Partial<Pacient>) => void
  appointments?: Appointment[]
}

function PacientSheet(
  { pacient, setPacient, appointments }: Props
) {

  return (
    <PacientSheetContext.Provider value={{ pacient, setPacient, appointments }}>
      <div>
        <MultitabFrame>
          <TabItem tabName="Dados Pessoais">
            <PacientSheetPersonalData />
          </TabItem>
          <TabItem tabName="Histórico">
            <PacientSheetHistory />
          </TabItem>
          <TabItem tabName="Contato">
            <PacientSheetContact />
          </TabItem>
        </MultitabFrame>
      </div>
    </PacientSheetContext.Provider>
  )
}

export default PacientSheet