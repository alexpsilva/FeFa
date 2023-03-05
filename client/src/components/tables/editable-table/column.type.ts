export default interface EditableColumnSpecification<T> {
  title: string
  key: keyof T
  isEditable?: boolean
  stringify?: (value: any) => string
}