export type FormatParam = string | number | boolean | symbol | Date;
export type FormatNestedParam = FormatParam | FormatParam[];

export interface DatabaseDriver {
    format(sql: string, ...params: FormatNestedParam[]): string;
    query<T>(sql: string): Promise<T[]>;
    queryByTable<T extends Record<string, object>>(sql: string): Promise<T[]>;
}