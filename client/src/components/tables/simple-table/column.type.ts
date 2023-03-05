export default interface SimpleColumnSpecification<T> {
  title: string
  key: keyof T
  stringify?: (value: any) => string
}