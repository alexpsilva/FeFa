import { DetailedHTMLProps, HTMLAttributes } from "react"
import { twMerge } from "tailwind-merge"

type Props = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

const ContentCard = ({ className, children, ...props }: Props) => {
  return <div
    className={twMerge(
      'px-6 py-4 rounded-lg bg-white drop-shadow-md',
      className
    )}
    {...props}
  >
    {children}
  </div>
}

export default ContentCard