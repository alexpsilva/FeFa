import ContentCard from "@/components/layout/contentCard"
import TextArea from "@/components/ui/textarea"
import Appointment from "@/types/model/appointment"
import { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"

type Props = {
  description?: Appointment['description']
} & ComponentProps<typeof ContentCard>


const AppointmentDescription = ({
  description,
  className,
  ...props
}: Props) => {
  return (
    <ContentCard
      className={twMerge(
        '',
        className,
      )}
      {...props}
    >
      <TextArea
        name='description'
        defaultValue={description}
        className='w-full'
      />
    </ContentCard>
  )
}

export default AppointmentDescription