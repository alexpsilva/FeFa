import { z } from 'zod';

import { BaseRepository } from '@infra/database/repository';
import type { WithCount } from '@infra/database/repository';

import { DbPacient, Pacient, UpdatePacientActionDto, CreatePacientActionDto } from './types';
import { User } from '../user/types';

export default class PacientRepository extends BaseRepository{
    static readonly tableName = 'pacients';

    static dbPacientToPacient(dbPacient: DbPacient): Pacient {
        return {
            id: dbPacient.id,
            userId: dbPacient.user_id,
            name: dbPacient.name,
            birthday: dbPacient.birthday,
            cpf: dbPacient.cpf,
            address: dbPacient.address,
            updatedAt: dbPacient.updated_at,
            createdAt: dbPacient.created_at,
        }
    }
    
    static dbPacientsToPacients(dbPacients: DbPacient[]): Pacient[] {
        return dbPacients.map(PacientRepository.dbPacientToPacient);
    }

    async findById(userId: User['id'], id: Pacient['id']): Promise<Pacient> {
        const sql = this.databaseDriver.format(`
            SELECT * 
            FROM ${PacientRepository.tableName}
            WHERE user_id = %s and id = %s
        `, 
            userId, id,
        );

        const result = await this.databaseDriver.query<DbPacient>(sql);
        const dbPacients = z.array(DbPacient).parse(result);

        if (dbPacients.length === 0) {
            throw new Error('Entity not found');
        }
        return PacientRepository.dbPacientsToPacients(dbPacients)[0];
    }

    async findAll(userId: User['id'], name: Pacient['name'], pagination?: { number: number, size: number }): Promise<WithCount<Pacient[]>> {
        const { limit, offset } = this.computePagination(pagination?.number ?? 1, pagination?.size ?? 10);

        const sql = this.databaseDriver.format(`
            SELECT *, COUNT(*) OVER() count 
            FROM ${PacientRepository.tableName} 
            WHERE 
                user_id = %L
                ${name ? this.databaseDriver.format('AND LOWER(name) LIKE LOWER(%L)', `%${name}%`) : ''}
            GROUP BY id 
            ORDER BY name
            ${limit ? this.databaseDriver.format('LIMIT %s', limit) : ''}
            ${offset ? this.databaseDriver.format('OFFSET %s', offset) : ''}
        `, userId);

        const result = await this.databaseDriver.query<DbPacient & {count: number}>(sql);
        const count = result.length ? result[0].count : 0;
        const dbPacients = z.array(DbPacient).parse(result);
        return {
            data: PacientRepository.dbPacientsToPacients(dbPacients),
            count,
        };
    }

    async create(entity: CreatePacientActionDto): Promise<Pacient> {
        const sql = this.databaseDriver.format(`
            INSERT INTO ${PacientRepository.tableName} (user_id, name, birthday, cpf, address) 
            VALUES (%L) 
            RETURNING *
        `, 
            [entity.userId, entity.name, entity.birthday, entity.cpf, entity.address],
        );
        
        const result = await this.databaseDriver.query<DbPacient>(sql);
        const dbPacients = z.array(DbPacient).parse(result);
        return PacientRepository.dbPacientsToPacients(dbPacients)[0];
    }

    async update(entity: UpdatePacientActionDto): Promise<Pacient> {
        const sql = this.databaseDriver.format(`
            UPDATE ${PacientRepository.tableName} 
            SET name = %L, birthday = %L, cpf = %L, address = %L, updated_at = %L 
            WHERE id = %L AND user_id = %L 
            RETURNING *
        `, 
            entity.name, entity.birthday, entity.cpf, entity.address, new Date(),
            entity.id, entity.userId,
        );

        const result = await this.databaseDriver.query<DbPacient>(sql);
        const dbPacients = z.array(DbPacient).parse(result);
        return PacientRepository.dbPacientsToPacients(dbPacients)[0];
    }

    async delete(userId: User['id'], id: Pacient['id']): Promise<Pacient> {
        const sql = this.databaseDriver.format(`
            DELETE
            FROM ${PacientRepository.tableName}
            WHERE id = %s AND user_id = %s
            RETURNING *
        `, id, userId);

        // to-do: Handle deletiong of pacients with associated appointments
        const result = await this.databaseDriver.query<DbPacient>(sql);
        if(result.length === 0) {
            throw new Error('Appointment not found');
        }

        const dbPacients = z.array(DbPacient).parse(result);
        return PacientRepository.dbPacientsToPacients(dbPacients)[0];
    }
};