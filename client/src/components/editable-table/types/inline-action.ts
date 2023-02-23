export default interface InlineActionSpecification<T> {
  icon?: string
  label: string
  onClick: (item: T) => void
  isEligible: (item: T) => boolean
}