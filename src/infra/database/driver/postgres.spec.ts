import pgFormat from "pg-format";
jest.mock('pg-format', () => jest.fn());
const pgFormatMock = pgFormat as jest.MockedFunction<typeof pgFormat>;

import pg from "pg";
jest.mock('pg', () => ({
    Pool: jest.fn()
}));
const pgMock = pg as jest.Mocked<typeof pg>;

import Logger from "../../log";
import PostgresDriver from './postgres';

describe('PostgresDriver', () => {
    describe('constructor()', () => {
        it('should instantiate a new connection pool', () => {
            new PostgresDriver({} as Logger, 'url');
            expect(pgMock.Pool).toHaveBeenCalledWith({ connectionString: 'url' });
        })
    })

    describe('query()', () => {
        it('should call the pg.Pool.query method and return the result', async () => {
            const poolMock = {
                query: jest.fn().mockResolvedValue({ rows: ['row1', 'row2'] }) as pg.Pool['query']
            } as pg.Pool
            
            pgMock.Pool.mockReturnValue(poolMock);
            
            const postgresDriver = new PostgresDriver({} as Logger, 'url');
            const result = await postgresDriver.query('sql', ['param1', 'param2']);

            expect(poolMock.query).toHaveBeenCalledWith('sql', ['param1', 'param2']);
            expect(result).toEqual(['row1', 'row2']);
        })

        it('should throw an error if pg.Pool.query fails', async () => {
            const poolMock = {
                query: jest.fn().mockRejectedValue(new Error('query failed')) as pg.Pool['query']
            } as pg.Pool
            
            pgMock.Pool.mockReturnValue(poolMock);
            
            const postgresDriver = new PostgresDriver({} as Logger, 'url');
            await expect(postgresDriver.query('sql', ['param1', 'param2'])).rejects.toThrow('query failed');
        })
    })

    describe('format()', () => {
        it('should call the pg-format library', () => {
            pgFormatMock.mockReturnValue('formatted sql');
            const postgresDriver = new PostgresDriver({} as Logger, 'url');
            const result = postgresDriver.format('sql', 'param1', 'param2');

            expect(pgFormatMock).toHaveBeenCalledWith('sql', 'param1', 'param2');
            expect(result).toEqual('formatted sql');
        })
    })
})