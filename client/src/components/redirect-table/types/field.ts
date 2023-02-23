export default interface TypeFieldSpecification<Type> {
  title: string
  key: Extract<keyof Type, string>
  stringify?: (value: any) => string
}