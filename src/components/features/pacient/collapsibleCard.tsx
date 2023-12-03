import PenIcon from "@/components/icons/pen"
import CollapsibleContentCard from "@/components/layout/contentCard/collapsible"
import Pacient from "@/types/model/pacient"
import { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"
import ClientLink from "../link"
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
        grid grid-flow-row
        grid-cols-[repeat(2,minmax(0,_1fr))_21px]
        gap-y-4 gap-x-8`,
        className
      )}
      {...props}
      permanent={
        <>
          <PacientSummary
            name={pacient?.name}
            birthday={pacient?.birthday}
            note={pacient?.note}
            readOnly={readOnly}
          />
          <ClientLink
            href={`/pacient/${pacient?.id}/edit`}
            className='col-start-3 row-start-1'
          >
            <PenIcon
              width="21"
              height="21"
              className="stroke-skin-selected cursor-pointer"
            />
          </ClientLink>
        </>
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