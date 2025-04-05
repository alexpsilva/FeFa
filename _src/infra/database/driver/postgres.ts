import pg from "pg";
import type { QueryArrayResult } from "pg";
import format from "pg-format";

import type { DatabaseDriver, FormatParam } from ".";
import Logger from "../../log";

export default class PostgresDriver implements DatabaseDriver {
    private pool: pg.Pool;

    private pendingSetup: Promise<void> = new Promise((resolve) => {resolve()});
    private tableIdMap: Map<number, string> = new Map();

    constructor(
        private readonly logger: Logger, 
        url: string,
        private readonly schema: string,
    ) {
        this.pool = new pg.Pool({
            connectionString: url,
        });

        this.addSetup(() => this.setupTableIdMap());
    }

    private addSetup(setup: () => Promise<void>) {
        this.pendingSetup = this.pendingSetup.then(setup);
    }

    private async setupTableIdMap(): Promise<void> {
        const sql = this.format(`
            SELECT t.tablename, c.oid
            FROM pg_catalog.pg_tables t
                INNER JOIN pg_catalog.pg_class c ON c.relname = t.tablename
            WHERE schemaname = %L
        `, this.schema); 
        const result = await this.query<{tablename: string, oid: number}>(sql);
        for (const row of result) {
            this.tableIdMap.set(row.oid, row.tablename);
        }

        this.logger.info('Finished DB table id map setup');
    }

    async query<T>(sql: string): Promise<T[]> {
        try {
            const result = await this.pool.query(sql)
            return result.rows as T[];
        } catch (e) {
            const message = `Failed to execute query "${sql}"\nError: ${e instanceof Error ? e.message : String(e)}`;
            this.logger.error(message);
            throw new Error(message);
        }
    }

    async queryByTable<T extends Record<string, object | string | number>>(sql: string): Promise<T[]> {
        let result: QueryArrayResult<T[]>;
        try {
            result = await this.pool.query({text: sql, rowMode: 'array'})
        } catch (e) {
            throw new Error(`Failed to execute query "${sql}"\nError: ${e instanceof Error ? e.message : String(e)}`);
        }

        await this.pendingSetup;
        const fields = result.fields.map(field => {
            if(field.tableID === 0) {
                // Computed fields like COUNT(*), MAX(), etc
                return {name: field.name, table: null};
            }

            const tableName = this.tableIdMap.get(field.tableID);
            if (!tableName) {
                throw new Error(`Table ID ${field.tableID} not found in table id map`);
            }
            return {name: field.name, table: tableName};
        });

        return result.rows.map(row => {
            const obj = {} as any;
            for (let i = 0; i < fields.length; i++) {
                const field = fields[i];

                if(field.table === null) {
                    obj[field.name] = row[i];
                } else {
                    obj[field.table] ??= {}
                    obj[field.table][field.name] = row[i];
                }
            }
            return obj;
        }) as T[];
    }

    format(sql: string, ...params: FormatParam[]): string {
        return format(sql, ...params);
    }
}