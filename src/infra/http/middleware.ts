import { HTTPMiddlewareResult, HTTPRequest, HTTPResponse } from "./type";

export default abstract class HTTPMiddleware {
    resolve(req: HTTPRequest, res: HTTPResponse): HTTPMiddlewareResult | Promise<HTTPMiddlewareResult> {
        throw new Error('Method not implemented.');
    }
}