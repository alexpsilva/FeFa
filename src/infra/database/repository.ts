import { z } from "zod";
import Logger from "../log";
import { DatabaseDriver } from "./driver";

// export type ColummnsOption<T> = (keyof T)[];
export type WithCount<T> = { count: number, data: T };

export abstract class BaseRepository {
    static readonly tableName: string;

    constructor(
        protected readonly logger: Logger, 
        protected readonly databaseDriver: DatabaseDriver,
    ) {}

    computePagination(pageNumbe: number, pageSize: number): { limit: number, offset: number } {
        return {
            limit: pageSize,
            offset: (pageNumbe - 1) * pageSize,
        }
    }
}