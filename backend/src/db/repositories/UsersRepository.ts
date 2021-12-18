import { IDatabase, IMain } from "pg-promise";
import IUsersRepository from "../../interfaces/IUsersRepository.interface";
import {users as sql} from '../sql';

class UsersRepository implements IUsersRepository {
    constructor(private db: IDatabase<any>, private pgp: IMain) {
    }

    async findByEmail(email: string) {
        return this.db.oneOrNone(sql.findByEmail, email)
    }

}

export default UsersRepository