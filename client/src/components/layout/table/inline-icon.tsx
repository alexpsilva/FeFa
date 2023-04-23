import { useTableContext } from "./table"

interface Props {
  builder: () => React.ReactNode
  onClick: (row: number) => void
}

const InlineIcon = ({ builder, onClick }: Props) => {
  const context = useTableContext()
  if (context.type != 'row') {
    throw new Error('InlineIcon component must be used in a Table row context')
  }

  return <a
    className="cursor-pointer stroke-slate-400"
    onClick={() => onClick(context.row)}
  >
    {builder()}
  </a>
}

export default InlineIcon