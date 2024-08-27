import { z } from 'zod';
import { BaseRepository } from '../../infra/database/repository';
import { User } from '../user/type';
import { CreatePacientDto, DbPacient, Pacient } from './type';

export default class PacientRepository extends BaseRepository<Pacient>{
    readonly tableName = 'pacients';

    private dbPacientToPacient(dbPacient: DbPacient): Pacient {
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

    private dbPacientsToPacients(dbPacients: DbPacient[]): Pacient[] {
        return dbPacients.map(this.dbPacientToPacient);
    }

    async findById(userId: User['id'], id: Pacient['id']): Promise<Pacient> {
        let sql = this.databaseDriver.format('SELECT * FROM %I WHERE user_id = %s and id = %s', this.tableName, userId, id);
        const result = await this.databaseDriver.query<DbPacient>(sql);
        const dbPacients = z.array(DbPacient).parse(result);

        if (dbPacients.length === 0) {
            throw new Error('Entity not found');
        }
        return this.dbPacientsToPacients(dbPacients)[0];
    }

    async findAll(userId: User['id']): Promise<Pacient[]> {
        let sql = this.databaseDriver.format('SELECT * FROM %I WHERE user_id = %L', this.tableName, userId);
        const result = await this.databaseDriver.query<DbPacient>(sql);
        const dbPacients = z.array(DbPacient).parse(result);
        return this.dbPacientsToPacients(dbPacients);
    }

    async create(entity: CreatePacientDto): Promise<Pacient> {
        const sql = this.databaseDriver.format(
            'INSERT INTO %I (user_id, name, birthday, cpf, address) VALUES (%L) RETURNING *', 
            this.tableName, 
            [entity.userId, entity.name, entity.birthday, entity.cpf, entity.address],
        );
        const result = await this.databaseDriver.query<DbPacient>(sql);
        const dbPacients = z.array(DbPacient).parse(result);
        return this.dbPacientsToPacients(dbPacients)[0];
    }
};