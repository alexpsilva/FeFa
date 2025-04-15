import { z } from 'zod';

import { BaseRepository } from '@infra/database/repository';
import type { WithCount } from '@infra/database/repository';

import type { User } from '../user/types';
import { DbMedicationSchema, type CreateMedication, type DbMedication, type DeleteMedication, type Medication, type UpdateMedication } from './types';

export default class MedicationRepository extends BaseRepository{
    static readonly tableName = 'medications';

    static dbMedicationToMedication(dbMedication: DbMedication): Medication {
        return {
            id: dbMedication.id,
            userId: dbMedication.user_id,
            name: dbMedication.name,
            updatedAt: dbMedication.updated_at,
            createdAt: dbMedication.created_at,
        }
    }
    
    static dbMedicationToMedications(dbMedication: DbMedication[]): Medication[] {
        return dbMedication.map(MedicationRepository.dbMedicationToMedication);
    }

    async findById(userId: User['id'], id: Medication['id']): Promise<Medication> {
        const sql = this.databaseDriver.format(`
            SELECT * 
            FROM ${MedicationRepository.tableName}
            WHERE user_id = %s and id = %s
        `, 
            userId, id,
        );

        const result = await this.databaseDriver.query<DbMedication>(sql);
        const dbMedication = z.array(DbMedicationSchema).parse(result);

        if (dbMedication.length === 0) {
            throw new Error('Entity not found');
        }
        return MedicationRepository.dbMedicationToMedications(dbMedication)[0];
    }

    async findAll(userId: User['id'], name: Medication['name'], pagination?: { number: number, size: number }): Promise<WithCount<Medication[]>> {
        const { limit, offset } = this.computePagination(pagination?.number ?? 1, pagination?.size ?? 10);

        const sql = this.databaseDriver.format(`
            SELECT *, COUNT(*) OVER() count 
            FROM ${MedicationRepository.tableName} 
            WHERE 
                user_id = %L
                ${name ? this.databaseDriver.format('AND LOWER(name) LIKE LOWER(%L)', `%${name}%`) : ''}
            GROUP BY id 
            ORDER BY name
            ${limit ? this.databaseDriver.format('LIMIT %s', limit) : ''}
            ${offset ? this.databaseDriver.format('OFFSET %s', offset) : ''}
        `, userId);

        const result = await this.databaseDriver.query<DbMedication & {count: number}>(sql);
        const count = result.length ? z.coerce.number().parse(result[0].count) : 0;
        const dbMedication = z.array(DbMedicationSchema).parse(result);
        return {
            data: MedicationRepository.dbMedicationToMedications(dbMedication),
            count,
        };
    }

    async create(entity: CreateMedication): Promise<Medication> {
        const sql = this.databaseDriver.format(`
            INSERT INTO ${MedicationRepository.tableName} (user_id, name) 
            VALUES (%L) 
            RETURNING *
        `, 
            [entity.userId, entity.name],
        );
        
        const result = await this.databaseDriver.query<DbMedication>(sql);
        const dbMedication = z.array(DbMedicationSchema).parse(result);
        return MedicationRepository.dbMedicationToMedications(dbMedication)[0];
    }

    async update(entity: UpdateMedication): Promise<Medication> {
        const sql = this.databaseDriver.format(`
            UPDATE ${MedicationRepository.tableName} 
            SET name = %L, updated_at = %L 
            WHERE id = %L AND user_id = %L 
            RETURNING *
        `, 
            entity.name, new Date(),
            entity.id, entity.userId,
        );

        const result = await this.databaseDriver.query<DbMedication>(sql);
        const dbMedication = z.array(DbMedicationSchema).parse(result);
        return MedicationRepository.dbMedicationToMedications(dbMedication)[0];
    }

    async delete({ id, userId }: DeleteMedication): Promise<Medication> {
        const sql = this.databaseDriver.format(`
            DELETE
            FROM ${MedicationRepository.tableName}
            WHERE id = %s AND user_id = %s
            RETURNING *
        `, id, userId);

        // to-do: Handle deletiong of Medication with associated Prescriptions
        const result = await this.databaseDriver.query<DbMedication>(sql);
        if(result.length === 0) {
            throw new Error('Medication not found');
        }

        const dbMedication = z.array(DbMedicationSchema).parse(result);
        return MedicationRepository.dbMedicationToMedications(dbMedication)[0];
    }
};