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
        <div className="flex h-7 w-full">
          {childrenArray.map((child, index) => (
            <div
              className={`px-2 border-t border-r first:border-l border-slate-300
                ${child.props.tabName != selected ? 'bg-slate-200' : ''}`}
              key={index}
              onClick={() => useSelected(child.props.tabName)}
            >
              {child.props.tabName}
            </div>
          ))}
        </div>
        <div
          className="p-2 border border-slate-300"
        >
          {selectedChild}
        </div>
      </div>
    </>
  )
}

export default MultitabFrame