export type DatabaseDriverParam = string | number | boolean | symbol | Date;
export type DatabaseDriverNestedParam = DatabaseDriverParam | DatabaseDriverParam[];

export interface DatabaseDriver {
    format(sql: string, ...params: DatabaseDriverNestedParam[]): string;
    query<T>(sql: string, params?: DatabaseDriverParam[]): Promise<T[]>;
}