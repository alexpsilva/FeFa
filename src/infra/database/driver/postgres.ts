import { Pool } from "pg";
import format from "pg-format";
import { DatabaseDriver, DatabaseDriverParam } from ".";
import Logger from "../../log";

export default class PostgresDriver implements DatabaseDriver {
    private pool: Pool;

    constructor(private readonly logger: Logger, url: string) {
        this.pool = new Pool({
            connectionString: url,
        });
    }

    async query<T>(sql: string, params?: DatabaseDriverParam[]): Promise<T[]> {
        try {
            const result = await this.pool.query(sql, params)
            return result.rows as T[];
        } catch (e) {
            // @ts-ignore
            throw new Error(`Failed to execute query "${sql}"\nError: ${e.message}`);
        }
    }

    format(sql: string, ...params: DatabaseDriverParam[]): string {
        return format(sql, ...params);
    }
}