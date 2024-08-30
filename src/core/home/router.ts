import { HTTPRouter, HTTPRequest, HTTPResponse } from "../../infra/http";
import Logger from "../../infra/log";

import JSXRenderer from "../../infra/render/jsx";
import HomePage from "./components/pages/home";
import NotFoundPage from "./components/pages/not_found";

export default class HomeRouter extends HTTPRouter {
    constructor(
        protected readonly logger: Logger, 
        private readonly renderer: JSXRenderer,
    ) {
        super(logger);

        this.addRoute('GET', '/', this.homePage);
        this.addRoute('GET', '/not-found', this.notFoundPage);
    }

    async homePage(req: HTTPRequest, res: HTTPResponse) {
        res.set('Content-Type', 'text/html');
        res.send(this.renderer.render(HomePage()));
    }

    async notFoundPage(req: HTTPRequest, res: HTTPResponse) {
        res.set('Content-Type', 'text/html');
        res.send(this.renderer.render(NotFoundPage()));
    }
}