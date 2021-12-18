import {ILoginCredentials} from '../models/ILoginCredentials.interface'
import { ILoginResponse } from '../models/ILoginResponse.interface';
import { IRegisterBody } from '../models/IRegisterBody.interface';
import { IRegisterResponse } from '../models/IRegsiterResponse';

export interface IAuthService {
    login: (credentials: ILoginCredentials) => Promise<ILoginResponse>,
    register: (credentials: IRegisterBody) => Promise<IRegisterResponse>
}