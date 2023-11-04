import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react"

type DivProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

const ScreenPane = ({ children, ...props }: DivProps) => {
  return <div
    className="flex-grow empty:hidden"
    {...props}
  >
    {children}
  </div>
}

const SplitScreen = ({ children, ...props }: DivProps) => {
  return <div
    className="flex"
    {...props}
  >
    {children}
  </div>
}

export { ScreenPane }
export default SplitScreen