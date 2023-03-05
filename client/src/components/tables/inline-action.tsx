import Button from "@/components/ui/button"

interface InlineActionSpecification<T> {
  icon?: string
  label: string
  onClick: (item: Partial<T>) => void
  isEligible?: (item: Partial<T>) => boolean
}

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

export type { InlineActionSpecification }
export default InlineAction