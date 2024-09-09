import { z } from 'zod';
import { BaseRepository } from '../../infra/database/repository';
import { DbAppointment, Appointment, UpdateAppointmentActionDto, CreateAppointmentActionDto } from './type';

import { User } from '../user/type';
import PacientRepository from '../pacient/repository';

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

    async findById(userId: User['id'], id: Appointment['id']): Promise<Appointment> {
        let sql = this.databaseDriver.format(`
            SELECT a.*
            FROM %I a
                INNER JOIN %I p ON a.pacient_id = p.id
            WHERE a.id = %s and p.user_id = %s
        `, AppointmentRepository.tableName, PacientRepository.tableName, id, userId);
        
        const result = await this.databaseDriver.query<DbAppointment>(sql);
        const dbAppointments = z.array(DbAppointment).parse(result);

        if (dbAppointments.length === 0) {
            throw new Error('Appointment not found');
        }
        return AppointmentRepository.dbAppointmentsToAppointments(dbAppointments)[0];
    }

    // async findAll(userId: User['id'], name: Appointment['name'], pagination?: { number: number, size: number }): Promise<WithCount<Appointment[]>> {
    //     const { limit, offset } = this.computePagination(pagination?.number ?? 1, pagination?.size ?? 10);

    //     const sql = this.databaseDriver.format(`
    //         SELECT *, COUNT(*) OVER() count 
    //         FROM %I 
    //         WHERE 
    //             user_id = %L
    //             ${name ? this.databaseDriver.format('AND LOWER(name) LIKE LOWER(%L)', `%${name}%`) : ''}
    //         GROUP BY id 
    //         ORDER BY name
    //         ${limit ? this.databaseDriver.format('LIMIT %s', limit) : ''}
    //         ${offset ? this.databaseDriver.format('OFFSET %s', offset) : ''}
    //     `, this.tableName, userId);

    //     const result = await this.databaseDriver.query<DbAppointment & {count: number}>(sql);
    //     const count = result.length ? result[0].count : 0;
    //     const dbAppointments = z.array(DbAppointment).parse(result);
    //     return {
    //         data: AppointmentRepository.dbAppointmentsToAppointments(dbAppointments),
    //         count,
    //     };
    // }

    async create(entity: CreateAppointmentActionDto): Promise<Appointment> {
        const sql = this.databaseDriver.format(`
            INSERT INTO %I (pacient_id, description, date) 
            SELECT %L WHERE EXISTS (SELECT 1 FROM %I WHERE id = %L AND user_id = %L)
            RETURNING *
        `, 
            AppointmentRepository.tableName, [entity.pacientId, entity.description, entity.date],
            PacientRepository.tableName, entity.pacientId, entity.userId,
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
            UPDATE %I a
            SET date = %L, description = %L, updated_at = %L 
            FROM %I p
            WHERE a.id = %s AND a.pacient_id = p.id AND p.user_id = %s
            RETURNING a.*
        `,
            AppointmentRepository.tableName, 
            entity.date,
            entity.description,
            new Date(),
            PacientRepository.tableName,
            entity.id,
            entity.userId,
        );

        const result = await this.databaseDriver.query<DbAppointment>(sql);
        if(result.length === 0) {
            throw new Error('Appointment not found');
        }

        const dbAppointments = z.array(DbAppointment).parse(result);
        return AppointmentRepository.dbAppointmentsToAppointments(dbAppointments)[0];
    }
};