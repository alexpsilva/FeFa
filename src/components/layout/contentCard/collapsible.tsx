'use client'

import ArrowHeadIcon from "@/components/icons/arrowHead"
import { ComponentProps, ReactNode, useState } from "react"
import ContentCard from "."

type Props = {
  initial?: 'collapsed' | 'expanded'
  permanent: ReactNode
  collapsible: ReactNode
} & ComponentProps<typeof ContentCard>

const CollapsibleContentCard = ({
  initial,
  permanent,
  collapsible,
  ...props
}: Props) => {
  const [collapsed, setCollapsed] = useState(initial == 'collapsed')

  if (collapsed) {
    return (
      <ContentCard {...props}>
        {permanent}
        <ArrowHeadIcon
          width="24"
          height="24"
          className="absolute right-4 bottom-2 stroke-skin-selected cursor-pointer"
          direction="down"
          onClick={() => setCollapsed(false)}
        />
      </ContentCard>
    )
  }

  return (
    <ContentCard {...props}>
      {permanent}
      {collapsible}
      <ArrowHeadIcon
        width="24"
        height="24"
        className="absolute right-4 bottom-2 stroke-skin-selected cursor-pointer"
        direction="up"
        onClick={() => setCollapsed(true)}
      />
    </ContentCard>
  )
}

export default CollapsibleContentCard