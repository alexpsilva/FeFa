import { HTTPRouter, HTTPRequest, HTTPResponse } from "../../infra/http";
import Logger from "../../infra/log";

import JSXRenderer from "../../infra/render/jsx";
import Home from "./components/home";

export default class HomeRouter extends HTTPRouter {
    constructor(
        protected readonly logger: Logger, 
        private readonly renderer: JSXRenderer,
    ) {
        super(logger);

        this.addRoute('GET', '/', this.renderHome);
    }

    async renderHome(req: HTTPRequest, res: HTTPResponse) {
        res.set('Content-Type', 'text/html');
        res.send(this.renderer.render(Home()));
    }
}