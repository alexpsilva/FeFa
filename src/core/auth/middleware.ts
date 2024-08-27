import JwtParser from "../../infra/jwt";
import { HTTPMiddleware, HTTPMiddlewareResult, HTTPRequest, HTTPResponse } from "../../infra/http";
import Logger from "../../infra/log";

export default class AuthMiddleware implements HTTPMiddleware {
    constructor(
        private readonly logger: Logger, 
        private readonly jwtParser: JwtParser,
    ) {}

    resolve (req: HTTPRequest, res: HTTPResponse): HTTPMiddlewareResult {
        if(req.cookies.accessToken === undefined){
            this.logger.error('Invalid access token');
            res.redirect('/login');
            return { type: 'stop' };
        }

        const accessToken = this.jwtParser.decode(req.cookies.accessToken);
        if(accessToken === null){
            this.logger.error('Invalid access token');
            res.redirect('/login');
            return { type: 'stop' };
        }
        
        res.locals.userId = accessToken.userId;
        return { type: 'continue' };
    }
}