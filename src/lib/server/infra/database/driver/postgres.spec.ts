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

describe.skip('PostgresDriver', () => {
    let mockLogger: Logger = {} as Logger;

    beforeEach(() => {
        jest.resetAllMocks();
        mockLogger.error = jest.fn<string, [string]>();
    })

    describe('constructor()', () => {
        it('should instantiate a new connection pool', () => {
            new PostgresDriver(mockLogger, 'url', 'public');
            expect(pgMock.Pool).toHaveBeenCalledTimes(1);
            expect(pgMock.Pool).toHaveBeenCalledWith({ connectionString: 'url' });
        })
    })

    describe('query()', () => {
        it('should call the pg.Pool.query method and return the result', async () => {
            const poolMock = {
                query: jest.fn().mockResolvedValue({ rows: ['row1', 'row2'] }) as pg.Pool['query']
            } as pg.Pool
            
            pgMock.Pool.mockReturnValue(poolMock);
            
            const postgresDriver = new PostgresDriver(mockLogger, 'url', 'public');
            const result = await postgresDriver.query('sql');

            expect(poolMock.query).toHaveBeenCalledTimes(1);
            expect(poolMock.query).toHaveBeenCalledWith('sql');
            expect(result).toEqual(['row1', 'row2']);
        })

        it('should throw an error if pg.Pool.query fails', async () => {
            const poolMock = {
                query: jest.fn().mockRejectedValue(new Error('query failed')) as pg.Pool['query']
            } as pg.Pool
            
            pgMock.Pool.mockReturnValue(poolMock);
            
            const postgresDriver = new PostgresDriver(mockLogger, 'url', 'public');
            await expect(postgresDriver.query('sql')).rejects.toThrow('query failed');
        })
    })

    describe('format()', () => {
        it('should call the pg-format library', () => {
            pgFormatMock.mockReturnValue('formatted sql');
            const postgresDriver = new PostgresDriver(mockLogger, 'url', 'public');
            const result = postgresDriver.format('sql', 'param1', 'param2');

            expect(pgFormatMock).toHaveBeenCalledTimes(1);
            expect(pgFormatMock).toHaveBeenCalledWith('sql', 'param1', 'param2');
            expect(result).toEqual('formatted sql');
        })

        it('should throw an error if pg-format fails', () => {
            pgFormatMock.mockImplementation(() => {
                throw new Error('format failed');
            });
            const postgresDriver = new PostgresDriver(mockLogger, 'url', 'public');
            expect(() => postgresDriver.format('sql', 'param1', 'param2')).toThrow('format failed');
        })
    })
})