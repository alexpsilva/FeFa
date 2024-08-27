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
        const result = await this.pool.query(sql, params)
        return result.rows as T[];
    }

    format(sql: string, ...params: DatabaseDriverParam[]): string {
        return format(sql, ...params);
    }
}