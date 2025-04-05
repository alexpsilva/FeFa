export default function snakeToCamelCase(snakeCase: string): string {
    return snakeCase.replace(/(_\w)/g, (matches) => matches[1].toUpperCase());
}