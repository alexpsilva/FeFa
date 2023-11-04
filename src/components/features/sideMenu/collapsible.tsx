'use client'

import ArrowHeadIcon from "@/components/icons/arrowHead"
import { DetailedHTMLProps, HTMLAttributes, useState } from "react"


type DivProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
type Props = {
  collapsed: React.ReactNode,
  expanded: React.ReactNode,
  logo?: React.ReactNode,
} & DivProps

const CollapsibleSideMenu = ({ collapsed, expanded, logo, className, ...props }: Props) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false)

  if (isCollapsed) {
    return (
      <nav onClick={() => setIsCollapsed(false)}>
        {collapsed}
      </nav>
    )
  }

  return (
    <nav className={className} {...props}>
      <div className="flex items-center pt-4 pb-8">
        <div className="flex justify-center flex-grow">
          {logo}
        </div>
        <ArrowHeadIcon className="flex-grow-0 stroke-skin-selected hover:cursor-pointer"
          width="23"
          height="23"
          direction='left'
          onClick={() => setIsCollapsed(true)}
        />
      </div>
      {expanded}
    </nav>
  )
}

export default CollapsibleSideMenu