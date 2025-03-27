export type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'silent';

const LOG_LEVEL_HIERARCHY: Record<LogLevel, number> = Object.freeze({
    'silent': 4,
    'error': 3,
    'warn': 2,
    'info': 1,
    'debug': 0,
});

const COLORS_MAP = Object.freeze({
    'Reset': '\x1b[0m',
    'Bright': '\x1b[1m',
    'Dim': '\x1b[2m',
    'Underscore': '\x1b[4m',
    'Blink': '\x1b[5m',
    'Reverse': '\x1b[7m',
    'Hidden': '\x1b[8m',
    
    'FgBlack': '\x1b[30m',
    'FgRed': '\x1b[31m',
    'FgGreen': '\x1b[32m',
    'FgYellow': '\x1b[33m',
    'FgBlue': '\x1b[34m',
    'FgMagenta': '\x1b[35m',
    'FgCyan': '\x1b[36m',
    'FgWhite': '\x1b[37m',
    'FgGray': '\x1b[90m',
    
    'BgBlack': '\x1b[40m',
    'BgRed': '\x1b[41m',
    'BgGreen': '\x1b[42m',
    'BgYellow': '\x1b[43m',
    'BgBlue': '\x1b[44m',
    'BgMagenta': '\x1b[45m',
    'BgCyan': '\x1b[46m',
    'BgWhite': '\x1b[47m',
    'BgGray': '\x1b[100m',
});
type COLOR = keyof typeof COLORS_MAP;

export default class Logger {
    level: LogLevel;
    constructor(level: string = 'debug') {
        if (!Object.keys(LOG_LEVEL_HIERARCHY).includes(level)) {
            throw new Error(`Invalid log level: ${level}`);
        }
        this.level = level as LogLevel;
    }

    private shouldLog(level: LogLevel) {
        return LOG_LEVEL_HIERARCHY[level] >= LOG_LEVEL_HIERARCHY[this.level];
    }

    private log(level: LogLevel, message: string, color: COLOR = 'Reset') {
        if (!this.shouldLog(level)) {
            return;
        }

        console.log(`${COLORS_MAP[color]}%s${COLORS_MAP.Reset}`, message);
    }

    debug(message: string) {
        return this.log('debug', message, "FgBlue");
    }

    info(message: string) {
        return this.log('info', message);
    }

    warn(message: string) {
        return this.log('warn', message, 'FgYellow');
    }

    error(message: string) {
        return this.log('error', message, 'FgRed');
    }
}