import JSXRenderer from "../../infra/render/jsx";
import Logger from "../../infra/log";

import { HTTPRouter, HTTPRequest, HTTPResponse } from "../../infra/http";

import PacientRepository from "./repository";
import { CreatePacientDto, GetPacientDto, ListPacientsDto } from "./type";
import ListPacientsShell from "./components/list_shell";
import ListPacients from "./components/list";
import CreatePacient from "./components/create";
import GetPacient from "./components/get";
import GetPacientShell from "./components/get_shell";

export default class PacientRouter extends HTTPRouter {
    constructor(
        protected readonly logger: Logger, 
        private readonly renderer: JSXRenderer, 
        private readonly pacientRepository: PacientRepository
    ) {
        super(logger, '/pacient');

        this.addRoute('GET', '/', this.listPacientsPage);
        this.addRoute('GET', '/:id(\\d+)', this.getPacientPage);
        this.addRoute('GET', '/new', this.createPacientPage);
        this.addRoute('POST', '/new', this.createPacient, { urlEncoded: true });
    }

    async listPacientsPage(req: HTTPRequest, res: HTTPResponse) {
        // to-do: Use safeParse and set htto status code instead
        const { userId } = ListPacientsDto.parse({ userId: res.locals.userId });
        const listPacients = async () => {
            const pacients = await this.pacientRepository.findAll(userId);
            return ListPacients(pacients, 'pacient-list');
        }

        res.set('Content-Type', 'text/html');
        this.pipeStream(res, this.renderer.renderStream(
            ListPacientsShell(), 
            listPacients()
        ));
    }

    async getPacientPage(req: HTTPRequest, res: HTTPResponse) {
        // to-do: Use safeParse and set htto status code instead
        const { userId, id } = GetPacientDto.parse({...req.params, userId: res.locals.userId});

        const getPacient = async () => {
            const pacient = await this.pacientRepository.findById(userId, id);
            return GetPacient(pacient, 'pacient');
        }

        res.set('Content-Type', 'text/html');
        this.pipeStream(res, this.renderer.renderStream(
            GetPacientShell(),
            getPacient(),
        ))
    }

    async createPacientPage(req: HTTPRequest, res: HTTPResponse) {
        res.set('Content-Type', 'text/html');
        res.send(this.renderer.render(CreatePacient()));
    }

    async createPacient(req: HTTPRequest, res: HTTPResponse) {
        // to-do: Use safeParse and set htto status code instead
        const pacient = CreatePacientDto.parse({...req.body, userId: res.locals.userId});  

        await this.pacientRepository.create(pacient);
        res.redirect('/pacient')
    }
}