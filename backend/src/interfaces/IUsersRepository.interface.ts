import IUser from "./IUser.interface";

interface IUsersRepository {
    findByEmail: (email: string) => Promise<IUser | null>,
}

export default IUsersRepository
