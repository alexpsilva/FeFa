export default interface InlineActionSpecification<T> {
  icon?: string
  label: string
  onClick: (item: Partial<T>) => void
  isEligible?: (item: Partial<T>) => boolean
}