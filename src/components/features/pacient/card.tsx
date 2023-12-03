import ContentCard from "@/components/layout/contentCard"
import Pacient from "@/types/model/pacient"
import { ComponentProps, ReactNode } from "react"
import { twMerge } from "tailwind-merge"
import PacientDetails from "./details"
import PacientSummary from "./summary"

type Props = {
  action?: ReactNode
  pacient?: Partial<Pacient>
  readOnly?: boolean
} & ComponentProps<typeof ContentCard>


const PacientCard = ({
  action,
  pacient,
  readOnly,
  className,
  ...props
}: Props) => {
  const gridCols = action
    ? 'grid-cols-[repeat(2,minmax(0,_1fr))_21px]'
    : 'grid-cols-[repeat(2,minmax(0,_1fr))]'

  return (
    <ContentCard
      className={twMerge(
        `grid grid-flow-row gap-y-4 gap-x-8 ${gridCols}`,
        className,
      )}
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
      {action ? <div className="col-start-3 row-start-1">{action}</div> : null}
    </ContentCard>
  )
}

export default PacientCard