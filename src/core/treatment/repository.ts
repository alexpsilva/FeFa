import { z } from 'zod';

import { BaseRepository } from '@infra/database/repository';
import type { WithCount } from '@infra/database/repository';

import type { User } from '../user/types';
import { DbTreatmentSchema, type CreateTreatment, type DbTreatment, type DeleteTreatment, type Treatment, type UpdateTreatment } from './types';

export default class TreatmentRepository extends BaseRepository{
    static readonly tableName = 'treatments';

    static dbTreatmentToTreatment(dbTreatment: DbTreatment): Treatment {
        return {
            id: dbTreatment.id,
            userId: dbTreatment.user_id,
            name: dbTreatment.name,
            updatedAt: dbTreatment.updated_at,
            createdAt: dbTreatment.created_at,
        }
    }
    
    static dbTreatmentsToTreatments(dbTreatments: DbTreatment[]): Treatment[] {
        return dbTreatments.map(TreatmentRepository.dbTreatmentToTreatment);
    }

    async findById(userId: User['id'], id: Treatment['id']): Promise<Treatment> {
        const sql = this.databaseDriver.format(`
            SELECT * 
            FROM ${TreatmentRepository.tableName}
            WHERE user_id = %s and id = %s
        `, 
            userId, id,
        );

        const result = await this.databaseDriver.query<DbTreatment>(sql);
        const dbTreatments = z.array(DbTreatmentSchema).parse(result);

        if (dbTreatments.length === 0) {
            throw new Error('Entity not found');
        }
        return TreatmentRepository.dbTreatmentsToTreatments(dbTreatments)[0];
    }

    async findAll(userId: User['id'], name: Treatment['name'], pagination?: { number: number, size: number }): Promise<WithCount<Treatment[]>> {
        const { limit, offset } = this.computePagination(pagination?.number ?? 1, pagination?.size ?? 10);

        const sql = this.databaseDriver.format(`
            SELECT *, COUNT(*) OVER() count 
            FROM ${TreatmentRepository.tableName} 
            WHERE 
                user_id = %L
                ${name ? this.databaseDriver.format('AND LOWER(name) LIKE LOWER(%L)', `%${name}%`) : ''}
            GROUP BY id 
            ORDER BY name
            ${limit ? this.databaseDriver.format('LIMIT %s', limit) : ''}
            ${offset ? this.databaseDriver.format('OFFSET %s', offset) : ''}
        `, userId);

        const result = await this.databaseDriver.query<DbTreatment & {count: number}>(sql);
        const count = result.length ? z.coerce.number().parse(result[0].count) : 0;
        const dbTreatments = z.array(DbTreatmentSchema).parse(result);
        return {
            data: TreatmentRepository.dbTreatmentsToTreatments(dbTreatments),
            count,
        };
    }

    async create(entity: CreateTreatment): Promise<Treatment> {
        const sql = this.databaseDriver.format(`
            INSERT INTO ${TreatmentRepository.tableName} (user_id, name) 
            VALUES (%L) 
            RETURNING *
        `, 
            [entity.userId, entity.name],
        );
        
        const result = await this.databaseDriver.query<DbTreatment>(sql);
        const dbTreatments = z.array(DbTreatmentSchema).parse(result);
        return TreatmentRepository.dbTreatmentsToTreatments(dbTreatments)[0];
    }

    async update(entity: UpdateTreatment): Promise<Treatment> {
        const sql = this.databaseDriver.format(`
            UPDATE ${TreatmentRepository.tableName} 
            SET name = %L, updated_at = %L 
            WHERE id = %L AND user_id = %L 
            RETURNING *
        `, 
            entity.name, new Date(),
            entity.id, entity.userId,
        );

        const result = await this.databaseDriver.query<DbTreatment>(sql);
        const dbTreatments = z.array(DbTreatmentSchema).parse(result);
        return TreatmentRepository.dbTreatmentsToTreatments(dbTreatments)[0];
    }

    async delete({ id, userId }: DeleteTreatment): Promise<Treatment> {
        const sql = this.databaseDriver.format(`
            DELETE
            FROM ${TreatmentRepository.tableName}
            WHERE id = %s AND user_id = %s
            RETURNING *
        `, id, userId);

        // to-do: Handle deletiong of Treatments with associated Prescriptions
        const result = await this.databaseDriver.query<DbTreatment>(sql);
        if(result.length === 0) {
            throw new Error('Treatment not found');
        }

        const dbTreatments = z.array(DbTreatmentSchema).parse(result);
        return TreatmentRepository.dbTreatmentsToTreatments(dbTreatments)[0];
    }
};