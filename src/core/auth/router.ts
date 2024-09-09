import JSXRenderer from "../../infra/render/jsx";
import { HTTPRouter, HTTPRequest, HTTPResponse } from "../../infra/http";
import Logger from "../../infra/log";
import JwtParser from "../../infra/jwt";
import GoogleLogin from "./components/google_login";
import UserRepository from "../user/repository";
import { GoogleSSORedirectRequest } from "./type";

export default class AuthRouter extends HTTPRouter {
    constructor(
        protected readonly logger: Logger,
        private readonly renderer: JSXRenderer, 
        private readonly jwtParser: JwtParser,
        private readonly userRepository: UserRepository,
    ) {
        super(logger);

        this.addRoute('GET', '/login', this.renderLogin);
        this.addRoute('POST', '/login-receiver', this.redirectWithAccessToken);
        this.addRoute('GET', '/logout', this.logout);
    }

    async logout(req: HTTPRequest, res: HTTPResponse) {
        res.clearCookie('accessToken');
        res.redirect('/login');
    }

    async renderLogin(req: HTTPRequest, res: HTTPResponse) {
        res.set('Content-Type', 'text/html');
        res.set('Referrer-Policy', 'no-referrer-when-downgrade');
        res.send(this.renderer.render(GoogleLogin()));
    }

    async redirectWithAccessToken(req: HTTPRequest, res: HTTPResponse) {
        const { body, cookies } = GoogleSSORedirectRequest.parse(req);
        
        // Validate the Verify the Cross-Site Request Forgery (CSRF) token as specified by Google in the following doc
        // https://developers.google.com/identity/gsi/web/guides/verify-google-id-token
        const bodyCsrfToken = body.gCsrfToken;        
        const cookieCsrfToken = cookies.g_csrf_token;
        if (bodyCsrfToken === undefined || cookieCsrfToken === undefined || bodyCsrfToken !== cookieCsrfToken) {
            this.logger.error(`Invalid CSRF token: ${bodyCsrfToken} !== ${cookieCsrfToken}`);
            res.status(403)
            res.send('Forbidden');
            return;
        }
        
        const credential = body.credential;
        const [payload, error] = await this.jwtParser.decodeGoogle(credential);
        if (error) {
            this.logger.error(String(error));
            res.status(403);
            res.send('Forbidden');
            return;
        }

        const user = await this.userRepository.findByEmail(payload.email);
        if (!user) {
            this.logger.error(`Unauthorized email: ${payload.email}`);
            res.status(403);
            res.send('Forbidden');
            return;
        }

        const accessToken = this.jwtParser.encode({
            userId: user.id,
            email: user.email,
        });
        res.cookie('accessToken', accessToken, {httpOnly: true, secure: true});

        //to-do: Generate a refresh token, shorten access token expire time
        // and implement a automatic refresh mechanism. This way, we would be
        // able to block a user and prevent it from generating new access tokens
        // without forcing other users to re-authenticate constantly.
        
        res.redirect('/');
    }
}