import Logger from "../log";
import { DatabaseDriver } from "./driver";

export type ColummnsOption<T> = (keyof T)[];
export type WithCount<T> = { count: number, data: T };

export abstract class BaseRepository<T> {
    abstract readonly tableName: string;

    constructor(
        protected readonly logger: Logger, 
        protected readonly databaseDriver: DatabaseDriver,
    ) {}

    // async findById(id: number): Promise<T> {
    //     const sql = this.databaseDriver.format('SELECT * FROM %I WHERE id = %L', this.tableName, id);
    //     const result = await this.databaseDriver.query<T>(sql);
    //     if (result.length === 0) {
    //         throw new Error('Entity not found');
    //     }

    //     if (result.length > 1) {
    //         throw new Error('Multiple entities found');
    //     }

    //     return result[0];
    // }
    
    // async findAll(): Promise<T[]> {
    //     const sql = this.databaseDriver.format('SELECT * FROM %I', this.tableName);
    //     return this.databaseDriver.query<T>(sql);
    // }

    // async create(entity: Partial<T>): Promise<T> {
    //     const columns = Object.keys(entity).join(', ')
    //     const values = Object.values(entity).join(', ')

    //     const sql = this.databaseDriver.format('INSERT INTO %I VALUES %L RETURNING *', this.tableName, columns, values);
    //     const result = await this.databaseDriver.query<T>(sql);
    //     return result[0];
    // }

    // async update(entity: Partial<T>): Promise<T> {
    //     const columns = Object.keys(entity).join(', ')
    //     const values = Object.values(entity).join(', ')

    //     const sql = this.databaseDriver.format('UPDATE %I SET (%I) VALUES %L RETURNING *', this.tableName, columns, values);
    //     const result = await this.databaseDriver.query<T>(sql);
    //     return result[0];
    // }

    async delete(id: number): Promise<void> {
        const sql = this.databaseDriver.format('DELETE FROM %I WHERE id = %L', this.tableName, id);
        await this.databaseDriver.query<T>(sql);
    }

    computePagination(pageNumbe: number, pageSize: number): { limit: number, offset: number } {
        return {
            limit: pageSize,
            offset: (pageNumbe - 1) * pageSize,
        }
    }
}