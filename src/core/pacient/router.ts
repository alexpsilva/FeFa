import JSXRenderer from "../../infra/render/jsx";
import Logger from "../../infra/log";

import { HTTPRouter, HTTPRequest, HTTPResponse } from "../../infra/http";

import PacientRepository from "./repository";
import { CreatePacientDto, GetPacientDto, ListPacientsDto, UpdatePacientDto } from "./type";

import CreatePacientPage from "./components/pages/create";
import { ListPacientsPageShell, ListPacientsPageContent } from "./components/pages/list";
import { GetPacientPageShell, GetPacientPageContent } from "./components/pages/get";

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
        // to-do: Use safeParse and set htto status code instead
        const { userId } = ListPacientsDto.parse({ userId: res.locals.userId });
        const listPacients = async () => {
            const pacients = await this.pacientRepository.findAll(userId);
            return ListPacientsPageContent(pacients, 'pacient-list');
        }

        res.set('Content-Type', 'text/html');
        this.pipeStream(res, this.renderer.renderStream(
            ListPacientsPageShell(), 
            listPacients() // to-do: Handle errors on streaming elements (after the initial shell and http status have already been set)
        ));
    }

    async getPacientPage(req: HTTPRequest, res: HTTPResponse) {
        // to-do: Use safeParse and set htto status code instead
        const { userId, id } = GetPacientDto.parse({...req.params, userId: res.locals.userId});

        const getPacient = async () => {
            const pacient = await this.pacientRepository.findById(userId, id);
            return GetPacientPageContent(pacient, 'pacient');
        }

        res.set('Content-Type', 'text/html');
        this.pipeStream(res, this.renderer.renderStream(
            GetPacientPageShell(),
            getPacient(), // to-do: Handle errors on streaming elements (after the initial shell and http status have already been set)
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