import ContentCard from "@/components/layout/contentCard"
import Stacked from "@/components/layout/stacked"
import Input from "@/components/ui/input"
import DateInput from "@/components/ui/input/date"
import Label from "@/components/ui/label"
import Appointment from "@/types/model/appointment"
import Pacient from "@/types/model/pacient"
import { ComponentProps, DetailedHTMLProps, HTMLAttributes, ReactNode } from "react"
import { twMerge } from "tailwind-merge"

type Props = {
  action?: ReactNode
  pacientName: Pacient['name']
  date?: Partial<Appointment>['date']
} & ComponentProps<typeof ContentCard>


const AppointmentHeader = ({
  action,
  pacientName,
  date,
  className,
  ...props
}: Props) => {
  const gridCols = action
    ? 'grid-cols-[repeat(2,minmax(0,_1fr))_21px]'
    : 'grid-cols-[repeat(2,minmax(0,_1fr))]'

  return (
    <ContentCard
      className={twMerge(
        `grid grid-flow-row ${gridCols} gap-x-8`,
        className,
      )}
      {...props}
    >
      <Stacked className="col-start-1 row-start-1">
        <Label htmlFor="pacientName">Nome</Label>
        <Input
          name="pacientName"
          value={pacientName}
          readOnly
        />
      </Stacked>
      <Stacked className="col-start-2 row-start-1">
        <Label htmlFor="date">Data</Label>
        <DateInput
          name="date"
          className="w-[13ch]"
          defaultValue={date ?? new Date()}
          required
        />
      </Stacked>
      {action ? <div className="col-start-3 row-start-1">{action}</div> : null}
    </ContentCard>
  )
}

export default AppointmentHeader