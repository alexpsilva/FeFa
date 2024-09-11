import JSXRenderer from "../../infra/render/jsx";
import Logger from "../../infra/log";

import { HTTPRouter, HTTPRequest, HTTPResponse } from "../../infra/http";

import PacientRepository from "./repository";
import { CreatePacientActionDto, CreatePacientDto, GetPacientDto, ListPacientsDto, UpdatePacientActionDto, UpdatePacientDto } from "./type";
import AppointmentRepository from "../appointment/repository";

import CreatePacientPage from "./components/pages/create";
import ListPacientsPage from "./components/pages/list";
import GetPacientPage from "./components/pages/get";
import UpdatePacientPage from "./components/pages/update";

export default class PacientRouter extends HTTPRouter {
    constructor(
        protected readonly logger: Logger, 
        private readonly renderer: JSXRenderer, 
        private readonly pacientRepository: PacientRepository, 
        private readonly appointmentRepository: AppointmentRepository,
    ) {
        super(logger, '/pacient');

        this.addRoute('GET', '/new', this.createPacientPage);
        this.addRoute('GET', '/', this.listPacientsPage);
        this.addRoute('GET', '/:id(\\d+)', this.getPacientPage);
        this.addRoute('GET', '/:id(\\d+)/edit', this.updatePacientPage);

        this.addRoute('POST', '/new', this.createPacientAction);
        this.addRoute('POST', '/:id(\\d+)/edit', this.updatePacientAction); // to-do: Change to PUT
        // to-do: Add delete route
    }

    async createPacientPage(req: HTTPRequest, res: HTTPResponse) {
        CreatePacientDto.parse({userId: res.locals.userId});

        res.set('Content-Type', 'text/html');
        res.send(this.renderer.render(CreatePacientPage()));
    }

    async listPacientsPage(req: HTTPRequest, res: HTTPResponse) {
        const { userId, name, pageNumber, pageSize } = ListPacientsDto.parse({ userId: res.locals.userId, ...req.query });
        const pagination = { number: pageNumber ?? 1, size: pageSize ?? 10 }; // to-do: Move this default to the config module
        
        res.set('Content-Type', 'text/html');
        this.pipeStream(res, this.renderer.renderAsync(
            ListPacientsPage,
            async () => this.pacientRepository.findAll(userId, name, pagination),
            name,
            pagination.number,
            pagination.size,
        ));
    }

    async getPacientPage(req: HTTPRequest, res: HTTPResponse) {
        const { userId, id, pageNumber, pageSize } = GetPacientDto.parse({userId: res.locals.userId, id: req.params.id});
        const pagination = { number: pageNumber ?? 1, size: pageSize ?? 5 }; // to-do: Move this default to the config module

        res.set('Content-Type', 'text/html');
        this.pipeStream(res, this.renderer.renderAsync(
            GetPacientPage,
            async () => this.pacientRepository.findById(userId, id),
            async () => this.appointmentRepository.findByPacientId(userId, id, pagination),
            id,
            pagination.number,
            pagination.size,
        ))
    }

    async updatePacientPage(req: HTTPRequest, res: HTTPResponse) {
        const { userId, id } = UpdatePacientDto.parse({userId: res.locals.userId, id: req.params.id});

        res.set('Content-Type', 'text/html');
        this.pipeStream(res, this.renderer.renderAsync(
            UpdatePacientPage,
            async () => this.pacientRepository.findById(userId, id),
        ))
    }

    async createPacientAction(req: HTTPRequest, res: HTTPResponse) {
        // to-do: Use safeParse and set htto status code instead
        const data = CreatePacientActionDto.parse({...req.body, userId: res.locals.userId});  

        const pacient = await this.pacientRepository.create(data);
        res.redirect(`/pacient/${pacient.id}`);
    }

    async updatePacientAction(req: HTTPRequest, res: HTTPResponse) {
        // to-do: Use safeParse and set htto status code instead
        const data = UpdatePacientActionDto.parse({...req.body, userId: res.locals.userId, id: req.params.id});  

        const pacient = await this.pacientRepository.update(data);
        res.redirect(`/pacient/${pacient.id}`);
    }
}