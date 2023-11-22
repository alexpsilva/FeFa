import ContentCard from "@/components/layout/contentCard"
import Pacient from "@/types/model/pacient"
import { ComponentProps } from "react"
import PacientDetails from "./details"
import PacientSummary from "./summary"

type Props = {
  pacient?: Partial<Pacient>
  readOnly?: boolean
} & ComponentProps<typeof ContentCard>


const PacientCard = ({ pacient, readOnly, ...props }: Props) => {

  return (
    <ContentCard
      className="
        grid grid-cols-2 grid-flow-row 
        gap-y-4 gap-x-8"
      {...props}
    >
      <PacientSummary
        name={pacient?.name}
        birthday={pacient?.birthday}
        note={pacient?.note}
        readOnly={readOnly}
      />
      <PacientDetails
        cpf={pacient?.cpf}
        address={pacient?.address}
        phones={pacient?.phones}
        readOnly={readOnly}
      />
    </ContentCard>
  )
}

export default PacientCard