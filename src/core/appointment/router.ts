import JSXRenderer from "../../infra/render/jsx";
import Logger from "../../infra/log";

import { HTTPRouter, HTTPRequest, HTTPResponse } from "../../infra/http";

import AppointmentRepository from "./repository";
import { CreateAppointmentActionDto, CreateAppointmentDto, DeleteAppointmentActionDto, ListAppointmentsDto, UpdateAppointmentActionDto, UpdateAppointmentDto } from "./type";
import CreateAppointmentPage from "./components/pages/create";
import UpdateAppointmentPage from "./components/pages/update";
import PacientRepository from "../pacient/repository";
import ListAppointmentsPage from "./components/pages/list";

export default class AppointmentRouter extends HTTPRouter {
    constructor(
        protected readonly logger: Logger, 
        private readonly renderer: JSXRenderer, 
        private readonly pacientRepository: PacientRepository,
        private readonly appointmentRepository: AppointmentRepository, 
        private readonly config: { appointmentListDefaultPageSize: number},
    ) {
        super(logger, '/appointment');

        this.addRoute('GET', '/pacient/:pacient_id(\\d+)/new', this.createAppointmentPage);
        this.addRoute('GET', '/', this.listAppointmentsPage);
        this.addRoute('GET', '/:id(\\d+)', this.getAppointmentPage);
        this.addRoute('GET', '/:id(\\d+)/edit', this.updateAppointmentPage);
        
        this.addRoute('POST', '/new', this.createAppointmentAction);
        this.addRoute('PUT', '/:id(\\d+)', this.updateAppointmentAction);
        this.addRoute('DELETE', '/:id(\\d+)', this.deleteAppointmentAction);
    }

    async createAppointmentPage(req: HTTPRequest, res: HTTPResponse) {
        const { pacientId } = CreateAppointmentDto.parse({userId: res.locals.userId, pacientId: req.params.pacient_id});

        res.set('Content-Type', 'text/html');
        this.pipeStream(res, this.renderer.renderAsync(
            CreateAppointmentPage,
            async () => this.pacientRepository.findById(res.locals.userId, pacientId),
        ));
    }

    async listAppointmentsPage(req: HTTPRequest, res: HTTPResponse) {
        const { userId, pageNumber, pageSize } = ListAppointmentsDto.parse({ userId: res.locals.userId, ...req.query });
        const pagination = { number: pageNumber ?? 1, size: pageSize ?? this.config.appointmentListDefaultPageSize };
        
        res.set('Content-Type', 'text/html');
        this.pipeStream(res, this.renderer.renderAsync(
            ListAppointmentsPage,
            async () => this.appointmentRepository.findAll(userId, pagination),
            pagination.number,
            pagination.size,
        ));
    }

    async getAppointmentPage(req: HTTPRequest, res: HTTPResponse) {
        res.redirect(301, `/appointment/${req.params.id}/edit`);
    }

    async updateAppointmentPage(req: HTTPRequest, res: HTTPResponse) {
        const { userId, id } = UpdateAppointmentDto.parse({userId: res.locals.userId, id: req.params.id});

        res.set('Content-Type', 'text/html');
        this.pipeStream(res, this.renderer.renderAsync(
            UpdateAppointmentPage,
            async () => this.appointmentRepository.findById(userId, id),
        ))
    }

    async createAppointmentAction(req: HTTPRequest, res: HTTPResponse) {
        // to-do: Use safeParse and set htto status code instead
        const data = CreateAppointmentActionDto.parse({...req.body, userId: res.locals.userId});  

        const appointment = await this.appointmentRepository.create(data);
        res.header('HX-REDIRECT', `/pacient/${appointment.pacientId}`);
        res.send();
        // to-do: Trigger a error/success toast (small notification pop-up) on the client side
    }

    async updateAppointmentAction(req: HTTPRequest, res: HTTPResponse) {
        // to-do: Use safeParse and set htto status code instead
        const data = UpdateAppointmentActionDto.parse({...req.body, userId: res.locals.userId, id: req.params.id});

        const appointment = await this.appointmentRepository.update(data);
        res.header('HX-REDIRECT', `/pacient/${appointment.pacientId}`);
        res.send();
        // to-do: Trigger a error/success toast (small notification pop-up) on the client side
    }

    async deleteAppointmentAction(req: HTTPRequest, res: HTTPResponse) {
        // to-do: Use safeParse and set htto status code instead
        const { userId, id } = DeleteAppointmentActionDto.parse({userId: res.locals.userId, id: req.params.id});  

        const appointment = await this.appointmentRepository.delete(userId, id);
        res.header('HX-REDIRECT', `/pacient/${appointment.pacientId}`);
        res.send();
        // to-do: Trigger a error/success toast (small notification pop-up) on the client side
    }
}