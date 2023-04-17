import Button from "@/components/ui/button"
import { useTableContext } from "./table"

interface Props {
  text: string
  onClick: (row: number) => void
}

const InlineButton = ({ text, onClick }: Props) => {
  const context = useTableContext()
  if (context.type != 'row') {
    throw new Error('InlineButton component must be used in a Table row context')
  }

  return <Button
    text={text}
    onClick={() => onClick(context.row)}
  />
}

export default InlineButton