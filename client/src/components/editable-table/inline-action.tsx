import Button from "../button"
import InlineActionSpecification from "./types/inline-action"

interface Props<T> {
  action: InlineActionSpecification<T>
  item: T
}

const InlineAction = <T,>(
  { action, item }: Props<T>
) => {
  if (!action.isEligible) { return null }

  return action.isEligible(item) ?
    <Button
      text={action.label}
      onClick={() => action.onClick(item)}
    />
    : null
}

export default InlineAction