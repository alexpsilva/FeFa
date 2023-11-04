'use client'

import { DetailedHTMLProps, FormHTMLAttributes, useState } from "react"

type FormProps = DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>

interface Props {
  tabs: { [key: string]: React.ReactNode }
  children?: React.ReactNode
}

function MultitabForm({ tabs, children, ...props }: Props & FormProps) {
  const tabNames = Object.keys(tabs)
  const [selected, setSelected] = useState<string>(tabNames[0])

  return (
    <form {...props}>
      <div className="flex h-7 w-full">
        {tabNames.map((tabName, index) => (
          <div
            className={`px-2 border-t border-r first:border-l border-slate-300
              ${tabName != selected ? 'bg-slate-200' : ''}`}
            key={index}
            onClick={() => setSelected(tabName)}
          >
            {tabName}
          </div>
        ))}
      </div>
      <div
        className="p-2 border border-slate-300"
      >
        {tabs[selected]}
      </div>
      {children}
    </form>
  )
}

export default MultitabForm