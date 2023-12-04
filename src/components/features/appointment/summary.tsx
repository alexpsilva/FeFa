'use client'

import ArrowHeadIcon from "@/components/icons/arrowHead"
import Input from "@/components/ui/input"
import TextArea from "@/components/ui/textarea"
import Appointment from "@/types/model/appointment"
import stringifyDate from "@/utils/date/stringify-date"
import { DetailedHTMLProps, HTMLAttributes, ReactNode, useState } from "react"
import { twMerge } from "tailwind-merge"

type DivProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
type Props = {
  actions?: ReactNode[]
  description: Appointment['description']
  date: Appointment['date']
} & DivProps


const AppointmentSummary = ({
  actions,
  description,
  date,
  className,
  ...props
}: Props) => {
  const [collapsed, setCollapsed] = useState(true)

  return (
    <div className={twMerge(
      `flex flex-row flex-nowrap
      items-center gap-x-4`,
      className,
    )}
      {...props}
    >
      <Input
        name='date'
        className='w-[9ch]'
        value={stringifyDate(date)}
        readOnly
      />
      <TextArea
        name='description'
        className='overflow-hidden flex-grow'
        value={description}
        maxRows={collapsed ? 2 : undefined}
        readOnly
      />
      <ArrowHeadIcon
        className="stroke-skin-selected cursor-pointer"
        width={21}
        height={21}
        direction={collapsed ? 'down' : 'up'}
        onClick={() => setCollapsed(!collapsed)}
      />
      {actions}
    </div>
  )
}

export default AppointmentSummary