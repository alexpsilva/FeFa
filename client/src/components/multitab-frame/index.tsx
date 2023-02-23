import Head from "next/head"
import Link from "next/link"
import { useState } from "react"

interface TabProps {
  tabName: string
}

interface Props {
  children: React.ReactElement<TabProps>[] | React.ReactElement<TabProps>
}

function MultitabFrame(
  { children }: Props
) {
  const childrenArray = children instanceof Array ? children : [children]
  if (childrenArray.length == 0) { throw new Error('A MultitabFrame must have at least one child') }

  const [selected, useSelected] = useState<string>(childrenArray[0].props.tabName)

  childrenArray.forEach(child => {
    if (!child.props.tabName) {
      throw new Error('Every child of MultitabFrame should define the "tabName" property')
    }
  })

  const selectedChild = childrenArray.find(child => child.props.tabName == selected)

  return (
    <>
      <div>
        <div style={{ width: "100%", height: "30px", display: "flex" }}>
          {childrenArray.map(child => (
            <div key={child.props.tabName} style={{ paddingLeft: "10px", paddingRight: "10px", border: '1px solid black' }} onClick={() => useSelected(child.props.tabName)}>
              {child.props.tabName}
            </div>
          ))}
        </div>
        <div style={{ border: '1px solid black' }}>
          {selectedChild}
        </div>
      </div>
    </>
  )
}

export default MultitabFrame