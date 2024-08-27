import Logger from "../log";
import cookie from "cookie";
import express from "express";
import HTTPMiddleware from "./middleware";
import { HTTPMethod, HTTPMiddlewareResult, HTTPRequest, HTTPResponse } from "./type";
import { Readable } from "stream";


export default class HTTPRouter {
    readonly expressRouter = express.Router();

    constructor(
        protected readonly logger: Logger,
        private readonly pathPrefix: string = '',
    ) {}

    private pathWithPrefix(path: string) {
        return `${this.pathPrefix}${path}`;
    }

    addRoute(method: HTTPMethod, path: string, handler: (req: HTTPRequest, res: HTTPResponse) => Promise<void>, options?: {urlEncoded?: boolean}) {
        const handlers = [];
        if(options?.urlEncoded) {
            handlers.push(express.urlencoded({ extended: true }));
        }
        handlers.push(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
            try{
                await handler.bind(this)(req, res)
            } catch (e) {
                next(e)
            }
        });

        switch(method) {
        case 'GET':
            this.expressRouter.get(this.pathWithPrefix(path), ...handlers);
            break;
        case 'POST':
            this.expressRouter.post(this.pathWithPrefix(path), ...handlers);
            break;
        case 'PUT':
            this.expressRouter.put(this.pathWithPrefix(path), ...handlers);
            break;
        case 'DELETE':
            this.expressRouter.delete(this.pathWithPrefix(path), ...handlers);
            break;
        default:
            throw new Error('Unsupported HTTP method');
        }
    }

    addStaticFolder(httpPath: string, folderPath: string) {
        this.expressRouter.use(this.pathWithPrefix(httpPath), express.static(folderPath, { dotfiles: 'ignore' }));
    }

    addRouter(router: HTTPRouter) {
        this.expressRouter.use(this.pathPrefix, router.expressRouter);
    }

    addMiddleware(middleware: HTTPMiddleware) {
        const expressMiddleware = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        let result: HTTPMiddlewareResult
        try {
            result = await middleware.resolve(req, res);
        } catch (e) {
            return next(e);
        }

        if(result.type === 'continue'){
            next();
        }
        }

        this.expressRouter.use(expressMiddleware);
    }

    private static formatRequest(req: express.Request, res: express.Response): string {
        return `${req.method} ${req.originalUrl}`
    }

    private loggerMiddleware(req: express.Request, res: express.Response, next: express.NextFunction): void {
        this.logger.info(HTTPRouter.formatRequest(req, res));
        res.on('close', () => {
            this.logger.info(`${HTTPRouter.formatRequest(req, res)} => ${res.statusCode} ${res.statusMessage}`)
        })
        next();
    }

    private addCookiesToRequestMiddleware(req: express.Request, res: express.Response, next: express.NextFunction): void {
        if(req.headers.cookie) {
            req.cookies = cookie.parse(req.headers.cookie);
        } else {
            req.cookies = {};
        }
        next();
    }

    private errorHandlerMiddleware(err: Error, req: express.Request, res: express.Response, next: express.NextFunction): void {
        this.logger.error(`${err.name}: ${err.message}`);
        res.status(500).send('Internal server error');
        next();
    }

    listen(port: number, callback?: () => void) {
        const expressApp = express();

        expressApp.use(this.loggerMiddleware.bind(this));
        expressApp.use(this.addCookiesToRequestMiddleware.bind(this));
        
        expressApp.use(this.expressRouter);

        expressApp.use(this.errorHandlerMiddleware.bind(this));

        expressApp.listen(port, callback);
    }

    pipeStream(res: HTTPResponse, chunks: Promise<string>[]) {
        const stream = new Readable({
            async read(size) {
                const chunkToRender = chunks.shift();
                
                if(!chunkToRender) {
                    this.push(null);
                } else {
                    stream.push(await chunkToRender);
                }
            }
        })
        stream.pipe(res);
    }
}
