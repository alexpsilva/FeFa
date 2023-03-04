import Button from "../button"
import InlineActionSpecification from "./types/inline-action"

interface Props<T> {
  action: InlineActionSpecification<T>
  row: Partial<T>
}

const InlineAction = <T,>(
  { action, row }: Props<T>
) => {
  return !action.isEligible || action.isEligible(row) ?
    <Button
      text={action.label}
      onClick={() => action.onClick(row)}
    />
    : null
}

export default InlineAction