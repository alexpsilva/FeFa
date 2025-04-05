import Logger from ".";

describe('Logger', () => {
    let consoleMock: jest.SpyInstance;
    
    beforeAll(() => {
        consoleMock = jest.spyOn(console, 'log').mockImplementation(() => {});
    })

    beforeEach(() => {
        jest.resetAllMocks();
    })

    afterAll(() => {
        consoleMock.mockRestore();
    })

    describe('constructor()', () => {
        it('should set default level to debug', () => {
            const logger = new Logger();
            expect(logger.level).toBe('debug');
        })

        it('should allow overriding default level', () => {
            const logger = new Logger('warn');
            expect(logger.level).toBe('warn');
        })

        it('should throw an error if a invalid log level is provided', () => {
            expect(() => new Logger('invalid' as any)).toThrow('Invalid log level: invalid');
        })
    })

    describe('debug()', () => {
        const blueTextMask = '\x1b[34m%s\x1b[0m'

        it('should emit a log if the current level is "debug"', () => {
            const logger = new Logger('debug');
            logger.debug('debug message');
            expect(consoleMock).toHaveBeenCalledTimes(1);
            expect(consoleMock).toHaveBeenCalledWith(blueTextMask, 'debug message');
        })

        it('should NOT emit a log if the current level is "info"', () => {
            const logger = new Logger('info');
            logger.debug('debug message');
            expect(consoleMock).not.toHaveBeenCalled();
        })

        it('should NOT emit a log if the current level is "warn"', () => {
            const logger = new Logger('warn');
            logger.debug('debug message');
            expect(consoleMock).not.toHaveBeenCalled();
        })

        it('should NOT emit a log if the current level is "error"', () => {
            const logger = new Logger('error');
            logger.debug('debug message');
            expect(consoleMock).not.toHaveBeenCalled();
        })

        it('should NOT emit a log if the current level is "silent"', () => {
            const logger = new Logger('silent');
            logger.debug('debug message');
            expect(consoleMock).not.toHaveBeenCalled();
        })
    })

    describe('info()', () => {
        const defaultTextMask = '\x1b[0m%s\x1b[0m'

        it('should emit a log if the current level is "debug"', () => {
            const logger = new Logger('debug');
            logger.info('debug message');
            expect(consoleMock).toHaveBeenCalledTimes(1);
            expect(consoleMock).toHaveBeenCalledWith(defaultTextMask, 'debug message');
        })

        it('should emit a log if the current level is "info"', () => {
            const logger = new Logger('info');
            logger.info('debug message');
            expect(consoleMock).toHaveBeenCalledTimes(1);
            expect(consoleMock).toHaveBeenCalledWith(defaultTextMask, 'debug message');
        })

        it('should NOT emit a log if the current level is "warn"', () => {
            const logger = new Logger('warn');
            logger.info('debug message');
            expect(consoleMock).not.toHaveBeenCalled();
        })

        it('should NOT emit a log if the current level is "error"', () => {
            const logger = new Logger('error');
            logger.info('debug message');
            expect(consoleMock).not.toHaveBeenCalled();
        })

        it('should NOT emit a log if the current level is "silent"', () => {
            const logger = new Logger('silent');
            logger.info('debug message');
            expect(consoleMock).not.toHaveBeenCalled();
        })
    })

    describe('warn()', () => {
        const yellowTextMask = '\x1b[33m%s\x1b[0m'

        it('should emit a log if the current level is "debug"', () => {
            const logger = new Logger('debug');
            logger.warn('debug message');
            expect(consoleMock).toHaveBeenCalledTimes(1);
            expect(consoleMock).toHaveBeenCalledWith(yellowTextMask, 'debug message');
        })

        it('should emit a log if the current level is "info"', () => {
            const logger = new Logger('info');
            logger.warn('debug message');
            expect(consoleMock).toHaveBeenCalledTimes(1);
            expect(consoleMock).toHaveBeenCalledWith(yellowTextMask, 'debug message');
        })

        it('should emit a log if the current level is "warn"', () => {
            const logger = new Logger('warn');
            logger.warn('debug message');
            expect(consoleMock).toHaveBeenCalledTimes(1);
            expect(consoleMock).toHaveBeenCalledWith(yellowTextMask, 'debug message');
        })

        it('should NOT emit a log if the current level is "error"', () => {
            const logger = new Logger('error');
            logger.warn('debug message');
            expect(consoleMock).not.toHaveBeenCalled();
        })

        it('should NOT emit a log if the current level is "silent"', () => {
            const logger = new Logger('silent');
            logger.warn('debug message');
            expect(consoleMock).not.toHaveBeenCalled();
        })
    })

    describe('error()', () => {
        const redTextMask = '\x1b[31m%s\x1b[0m'
        
        it('should emit a log if the current level is "debug"', () => {
            const logger = new Logger('debug');
            logger.error('debug message');
            expect(consoleMock).toHaveBeenCalledTimes(1);
            expect(consoleMock).toHaveBeenCalledWith(redTextMask, 'debug message');
        })

        it('should emit a log if the current level is "info"', () => {
            const logger = new Logger('info');
            logger.error('debug message');
            expect(consoleMock).toHaveBeenCalledTimes(1);
            expect(consoleMock).toHaveBeenCalledWith(redTextMask, 'debug message');
        })

        it('should emit a log if the current level is "warn"', () => {
            const logger = new Logger('warn');
            logger.error('debug message');
            expect(consoleMock).toHaveBeenCalledTimes(1);
            expect(consoleMock).toHaveBeenCalledWith(redTextMask, 'debug message');
        })

        it('should emit a log if the current level is "error"', () => {
            const logger = new Logger('error');
            logger.error('debug message');
            expect(consoleMock).toHaveBeenCalledTimes(1);
            expect(consoleMock).toHaveBeenCalledWith(redTextMask, 'debug message');
        })

        it('should NOT emit a log if the current level is "silent"', () => {
            const logger = new Logger('silent');
            logger.error('debug message');
            expect(consoleMock).not.toHaveBeenCalled();
        })
    })
})