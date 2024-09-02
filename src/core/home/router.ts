import { HTTPRouter, HTTPRequest, HTTPResponse } from "../../infra/http";
import Logger from "../../infra/log";

import JSXRenderer from "../../infra/render/jsx";
import HomePage from "./components/pages/home";

export default class HomeRouter extends HTTPRouter {
    constructor(
        protected readonly logger: Logger, 
        private readonly renderer: JSXRenderer,
    ) {
        super(logger);

        this.addRoute('GET', '/', this.homePage);
    }

    async homePage(req: HTTPRequest, res: HTTPResponse) {
        res.set('Content-Type', 'text/html');
        res.send(this.renderer.render(HomePage()));
    }
}