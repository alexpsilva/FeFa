import { z } from 'zod';
import { BaseRepository, PaginationParams, WithCount } from '../../infra/database/repository';
import { DbAppointment, Appointment, UpdateAppointmentActionDto, CreateAppointmentActionDto } from './type';

import { User } from '../user/type';
import PacientRepository from '../pacient/repository';
import { DbPacient, Pacient } from '../pacient/type';

type AppointmentWithPacient = Appointment & {pacient: Pacient};

export default class AppointmentRepository extends BaseRepository{
    static readonly tableName = 'appointments';

    static dbAppointmentToAppointment(dbAppointment: DbAppointment): Appointment {
        return {
            id: dbAppointment.id,
            pacientId: dbAppointment.pacient_id,
            description: dbAppointment.description,
            date: dbAppointment.date,
            updatedAt: dbAppointment.updated_at,
            createdAt: dbAppointment.created_at,
        }
    }
    
    static dbAppointmentsToAppointments(dbAppointments: DbAppointment[]): Appointment[] {
        return dbAppointments.map(AppointmentRepository.dbAppointmentToAppointment);
    }

    async findById(userId: User['id'], id: Appointment['id']): Promise<AppointmentWithPacient> {
        const sql = this.databaseDriver.format(`
            SELECT *
            FROM ${AppointmentRepository.tableName} a 
                INNER JOIN ${PacientRepository.tableName} p ON a.pacient_id = p.id
            WHERE a.id = %s and p.user_id = %s
        `,
            id, userId,
        );
        
        const dbEntity = z.object({
            [AppointmentRepository.tableName]: DbAppointment,
            [PacientRepository.tableName]: DbPacient,
        })
        const result = await this.databaseDriver.queryByTable<z.infer<typeof dbEntity>>(sql);
        const dbEntities = z.array(dbEntity).parse(result);

        if (dbEntities.length === 0) {
            throw new Error('Appointment not found');
        }

        return dbEntities.map(({appointments, pacients}) => ({
            ...AppointmentRepository.dbAppointmentToAppointment(appointments), 
            pacient: PacientRepository.dbPacientToPacient(pacients),
        }))[0];
    }

    async findByPacientId(userId: User['id'], pacientId: Pacient['id'], pagination?: PaginationParams): Promise<WithCount<Appointment[]>> {
        const { limit, offset } = this.computePagination(pagination?.number ?? 1, pagination?.size ?? 10);

        const sql = this.databaseDriver.format(`
            SELECT a.*, COUNT(*) OVER() count 
            FROM ${AppointmentRepository.tableName} a
                INNER JOIN ${PacientRepository.tableName} p ON a.pacient_id = p.id
            WHERE 
                p.user_id = %L AND p.id = %s
            GROUP BY a.id 
            ORDER BY a.date DESC
            LIMIT %s
            OFFSET %s
        `, userId, pacientId, limit, offset);

        const result = await this.databaseDriver.query<DbAppointment & {count: number}>(sql);
        const dbAppointments = z.array(DbAppointment.extend({ count: z.coerce.number() })).parse(result);
        
        return {
            data: AppointmentRepository.dbAppointmentsToAppointments(dbAppointments),
            count: dbAppointments.length ? dbAppointments[0].count : 0,
        };
    }

    async findAll(userId: User['id'], pagination?: PaginationParams): Promise<WithCount<AppointmentWithPacient[]>> {
        const { limit, offset } = this.computePagination(pagination?.number ?? 1, pagination?.size ?? 10);

        const sql = this.databaseDriver.format(`
            SELECT *, COUNT(*) OVER() count 
            FROM ${AppointmentRepository.tableName} a
                INNER JOIN ${PacientRepository.tableName} p ON a.pacient_id = p.id
            WHERE 
                p.user_id = %L
            GROUP BY a.id, p.id
            ORDER BY a.date DESC
            LIMIT %s
            OFFSET %s
        `, userId, limit, offset);

        const dbEntity = z.object({
            [AppointmentRepository.tableName]: DbAppointment,
            [PacientRepository.tableName]: DbPacient,
            count: z.coerce.number(),
        })
        const result = await this.databaseDriver.queryByTable<z.infer<typeof dbEntity>>(sql);
        const dbEntities = z.array(dbEntity).parse(result);
        
        return {
            data: dbEntities.map(({appointments, pacients}) => ({
                ...AppointmentRepository.dbAppointmentToAppointment(appointments), 
                pacient: PacientRepository.dbPacientToPacient(pacients),
            })),
            count: result.length ? result[0].count : 0,
        };
    }

    async create(entity: CreateAppointmentActionDto): Promise<Appointment> {
        const sql = this.databaseDriver.format(`
            INSERT INTO ${AppointmentRepository.tableName} (pacient_id, description, date) 
            SELECT %L WHERE EXISTS (
                SELECT 1 FROM ${PacientRepository.tableName} WHERE id = %L AND user_id = %L
            )
            RETURNING *
        `, 
            [entity.pacientId, entity.description, entity.date],
            entity.pacientId, entity.userId,
        );  

        const result = await this.databaseDriver.query<DbAppointment>(sql);
        if(result.length === 0) {
            throw new Error('Pacient not found');
        }

        const dbAppointments = z.array(DbAppointment).parse(result);
        return AppointmentRepository.dbAppointmentsToAppointments(dbAppointments)[0];
    }

    async update(entity: UpdateAppointmentActionDto): Promise<Appointment> {
        const sql = this.databaseDriver.format(`
            UPDATE ${AppointmentRepository.tableName} a
            SET date = %L, description = %L, updated_at = %L 
            FROM ${PacientRepository.tableName} p
            WHERE a.id = %s AND a.pacient_id = p.id AND p.user_id = %s
            RETURNING a.*
        `,
            entity.date, entity.description, new Date(),
            entity.id, entity.userId,
        );

        const result = await this.databaseDriver.query<DbAppointment>(sql);
        if(result.length === 0) {
            throw new Error('Appointment not found');
        }

        const dbAppointments = z.array(DbAppointment).parse(result);
        return AppointmentRepository.dbAppointmentsToAppointments(dbAppointments)[0];
    }
};