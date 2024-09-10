import Logger from "../log";
import { DatabaseDriver } from "./driver";

// export type ColummnsOption<T> = (keyof T)[];
export type PaginationParams = { number: number, size: number };
export type WithCount<T> = { count: number, data: T };

export abstract class BaseRepository {
    static readonly tableName: string;

    constructor(
        protected readonly logger: Logger, 
        protected readonly databaseDriver: DatabaseDriver,
    ) {}

    computePagination(pageNumber: PaginationParams['number'], pageSize: PaginationParams['size']): { limit: number, offset: number } {
        return {
            limit: pageSize,
            offset: (pageNumber - 1) * pageSize,
        }
    }
}