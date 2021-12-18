import { IRegisterBody } from "../models/IRegisterBody.interface";
import IUser from "../models/IUser.interface";

interface IUsersRepository {
    findByEmail: (email: string) => Promise<IUser | null>,
    createUser: (credentials: IRegisterBody) => Promise<IUser | null>
}

export default IUsersRepository
