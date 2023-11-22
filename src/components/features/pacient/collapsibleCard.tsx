import CollapsibleContentCard from "@/components/layout/contentCard/collapsible"
import Pacient from "@/types/model/pacient"
import { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"
import PacientDetails from "./details"
import PacientSummary from "./summary"

type Props = {
  pacient?: Partial<Pacient>
  readOnly?: boolean
} & Omit<ComponentProps<typeof CollapsibleContentCard>, 'permanent' | 'collapsible'>


const PacientCollapsibleCard = ({
  pacient,
  readOnly,
  className,
  ...props
}: Props) => {

  return (
    <CollapsibleContentCard
      className={twMerge(`
        grid grid-cols-2 grid-flow-row 
        gap-y-4 gap-x-8`,
        className
      )}
      {...props}
      permanent={
        <PacientSummary
          name={pacient?.name}
          birthday={pacient?.birthday}
          note={pacient?.note}
          readOnly={readOnly}
        />
      }
      collapsible={
        <PacientDetails
          cpf={pacient?.cpf}
          address={pacient?.address}
          phones={pacient?.phones}
          readOnly={readOnly}
        />
      }
    >
    </CollapsibleContentCard>
  )
}

export default PacientCollapsibleCard