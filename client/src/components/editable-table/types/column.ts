export default interface ColumnSpecification<T> {
  title: string
  key: keyof T
  isEditable?: boolean
  stringify?: (value: any) => string
}