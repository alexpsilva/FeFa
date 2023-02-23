import React from "react";

interface Props {
  tabName: string
  children: React.ReactElement | React.ReactElement[]
}

const TabItem = ({ children }: Props) => {
  const childrenArray = children instanceof Array ? children : [children]
  return <>{...childrenArray}</>
}

export default TabItem