import { IDatabase, IMain } from "pg-promise";
import { IRegisterBody } from "../../interfaces/models/IRegisterBody.interface";
import IUsersRepository from "../../interfaces/repositories/IUsersRepository.interface";
import {users as sql} from '../sql';

class UsersRepository implements IUsersRepository {
    constructor(private db: IDatabase<any>, private pgp: IMain) {
    }

    async findByEmail(email: string) {
        return this.db.oneOrNone(sql.findByEmail, email)
    }

    async createUser(credentials: IRegisterBody) {
        return this.db.one(sql.createUser, credentials)
    }

}

export default UsersRepository