import { BaseRepository } from '../../infra/database/repository';
import { User } from './type';

export default class UserRepository extends BaseRepository<User>{
    readonly tableName = 'users';

    async findByEmail(email: string): Promise<User | null> {
        const result = await this.databaseDriver.query<User>(`SELECT id, name, email FROM ${this.tableName} WHERE email = $1`, [email]);
        if (result.length === 0) {
            return null;
        }

        if (result.length > 1) {
            throw new Error('Multiple users found');
        }

        return result[0];
    }
};