import JSXRenderer from "../../infra/render/jsx";
import Logger from "../../infra/log";

import { HTTPRouter, HTTPRequest, HTTPResponse } from "../../infra/http";

import PacientRepository from "./repository";
import { CreatePacientDto, GetPacientDto, ListPacientsDto, UpdatePacientDto } from "./type";

import CreatePacientPage from "./components/pages/create";
import ListPacientsPage from "./components/pages/list";
import GetPacientPage from "./components/pages/get";

export default class PacientRouter extends HTTPRouter {
    constructor(
        protected readonly logger: Logger, 
        private readonly renderer: JSXRenderer, 
        private readonly pacientRepository: PacientRepository
    ) {
        super(logger, '/pacient');

        this.addRoute('GET', '/', this.listPacientsPage);
        this.addRoute('GET', '/:id(\\d+)', this.getPacientPage);
        this.addRoute('POST', '/:id(\\d+)', this.updatePacientAction, { urlEncoded: true });
        this.addRoute('GET', '/new', this.createPacientPage);
        this.addRoute('POST', '/new', this.createPacientAction, { urlEncoded: true });
    }

    async listPacientsPage(req: HTTPRequest, res: HTTPResponse) {
        const { userId, name, pageNumber, pageSize } = ListPacientsDto.parse({ userId: res.locals.userId, ...req.query });
        const pagination = { number: pageNumber ?? 1, size: pageSize ?? 10 }; // to-do: Move this default to the config module
        
        res.set('Content-Type', 'text/html');
        this.pipeStream(res, this.renderer.renderStream(
            new ListPacientsPage(
                async () => this.pacientRepository.findAll(userId, name, pagination),
                name,
                pagination.number,
                pagination.size,
            )
        ));
    }

    async getPacientPage(req: HTTPRequest, res: HTTPResponse) {
        const { userId, id } = GetPacientDto.parse({userId: res.locals.userId, id: req.params.id});

        res.set('Content-Type', 'text/html');
        this.pipeStream(res, this.renderer.renderStream(
            new GetPacientPage(async () => this.pacientRepository.findById(userId, id))
        ))
    }

    async createPacientPage(req: HTTPRequest, res: HTTPResponse) {
        res.set('Content-Type', 'text/html');
        res.send(this.renderer.render(CreatePacientPage()));
    }

    async createPacientAction(req: HTTPRequest, res: HTTPResponse) {
        // to-do: Use safeParse and set htto status code instead
        const data = CreatePacientDto.parse({...req.body, userId: res.locals.userId});  

        const pacient = await this.pacientRepository.create(data);
        res.redirect(`/pacient/${pacient.id}`);
    }

    async updatePacientAction(req: HTTPRequest, res: HTTPResponse) {
        // to-do: Use safeParse and set htto status code instead
        const data = UpdatePacientDto.parse({...req.body, userId: res.locals.userId, id: req.params.id});  

        const pacient = await this.pacientRepository.update(data);
        res.redirect(`/pacient/${pacient.id}`);
    }
}