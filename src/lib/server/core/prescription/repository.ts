import { z } from 'zod';

import { BaseRepository } from '$lib/server/infra/database/repository';
import type { WithCount } from '$lib/server/infra/database/repository';

import { DbPrescriptionSchema, type DbPrescription } from './types';
import type { CreatePrescription, DeletePrescription, Prescription, UpdatePrescription } from '$lib/schemas/core/prescription';
import type { User } from '$lib/schemas/core/user';

export default class PrescriptionRepository extends BaseRepository{
    static readonly tableName = 'prescriptions';

    static dbPrescriptionToPrescription(dbPrescription: DbPrescription): Prescription {
        return {
            id: dbPrescription.id,
            startedOnAppointmentId: dbPrescription.started_on_appointment_id,
            endedOnAppointmentId: dbPrescription.ended_on_appointment_id,
            medicationId: dbPrescription.medication_id,
            dose: dbPrescription.dose,
            frequency: dbPrescription.frequency,
            updatedAt: dbPrescription.updated_at,
            createdAt: dbPrescription.created_at,
        }
    }
    
    static dbPrescriptionToPrescriptions(dbPrescription: DbPrescription[]): Prescription[] {
        return dbPrescription.map(PrescriptionRepository.dbPrescriptionToPrescription);
    }

    async findById(userId: User['id'], id: Prescription['id']): Promise<Prescription> {
        const sql = this.databaseDriver.format(`
            SELECT p.* 
            FROM ${PrescriptionRepository.tableName} p
                JOIN appointments a ON p.started_on_appointment_id = a.id
                JOIN pacients pa ON a.pacient_id = pa.id
            WHERE pa.user_id = %s and p.id = %s
        `, 
            userId, id,
        );

        const result = await this.databaseDriver.query<DbPrescription>(sql);
        const dbPrescription = z.array(DbPrescriptionSchema).parse(result);

        if (dbPrescription.length === 0) {
            throw new Error('Entity not found');
        }
        return PrescriptionRepository.dbPrescriptionToPrescriptions(dbPrescription)[0];
    }

    // async findAll(userId: User['id'], name: Prescription['name'], pagination?: { number: number, size: number }): Promise<WithCount<Prescription[]>> {
    //     const { limit, offset } = this.computePagination(pagination?.number ?? 1, pagination?.size ?? 10);

    //     const sql = this.databaseDriver.format(`
    //         SELECT *, COUNT(*) OVER() count 
    //         FROM ${PrescriptionRepository.tableName} 
    //         WHERE 
    //             user_id = %L
    //             ${name ? this.databaseDriver.format('AND LOWER(name) LIKE LOWER(%L)', `%${name}%`) : ''}
    //         GROUP BY id 
    //         ORDER BY name
    //         ${limit ? this.databaseDriver.format('LIMIT %s', limit) : ''}
    //         ${offset ? this.databaseDriver.format('OFFSET %s', offset) : ''}
    //     `, userId);

    //     const result = await this.databaseDriver.query<DbPrescription & {count: number}>(sql);
    //     const count = result.length ? z.coerce.number().parse(result[0].count) : 0;
    //     const dbPrescription = z.array(DbPrescriptionSchema).parse(result);
    //     return {
    //         data: PrescriptionRepository.dbPrescriptionToPrescriptions(dbPrescription),
    //         count,
    //     };
    // }

    async create(entity: CreatePrescription): Promise<Prescription> {
        const sql = this.databaseDriver.format(`
            INSERT INTO ${PrescriptionRepository.tableName} (user_id, name) 
            VALUES (%L) 
            RETURNING *
        `, 
            [entity.userId, entity.name],
        );
        
        const result = await this.databaseDriver.query<DbPrescription>(sql);
        const dbPrescription = z.array(DbPrescriptionSchema).parse(result);
        return PrescriptionRepository.dbPrescriptionToPrescriptions(dbPrescription)[0];
    }

    async update(entity: UpdatePrescription): Promise<Prescription> {
        const sql = this.databaseDriver.format(`
            UPDATE ${PrescriptionRepository.tableName} 
            SET name = %L, updated_at = %L 
            WHERE id = %L AND user_id = %L 
            RETURNING *
        `, 
            entity.name, new Date(),
            entity.id, entity.userId,
        );

        const result = await this.databaseDriver.query<DbPrescription>(sql);
        const dbPrescription = z.array(DbPrescriptionSchema).parse(result);
        return PrescriptionRepository.dbPrescriptionToPrescriptions(dbPrescription)[0];
    }

    async end({ id, userId }: DeletePrescription): Promise<Prescription> {
        await this.databaseDriver.transaction(async () => {
            const prescription = await this.findById(userId, id);

            const sql = this.databaseDriver.format(`
                DELETE
                FROM ${PrescriptionRepository.tableName}
                WHERE id = %s AND appointment
                RETURNING *
            `, id, userId);
    
            // to-do: Handle deletiong of Prescription with associated Prescriptions
            const result = await this.databaseDriver.query<DbPrescription>(sql);
            if(result.length === 0) {
                throw new Error('Prescription not found');
            }
    
            const dbPrescription = z.array(DbPrescriptionSchema).parse(result);
            return PrescriptionRepository.dbPrescriptionToPrescriptions(dbPrescription)[0];
        })
        
    }
};