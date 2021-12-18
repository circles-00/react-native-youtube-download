import { ILoginCredentials } from "../models/ILoginCredentials.interface";
import { IRegisterBody } from "../models/IRegisterBody.interface";
import { ILoginValidationResponse } from "../validation/ILoginValidationResponse.interface";
import { IRegisterValidationResponse } from "../validation/IRegisterValidationResponse.interface";

export interface IValidationService {
    login: (credentials: ILoginCredentials) => ILoginValidationResponse,
    register: (credentials: IRegisterBody) => IRegisterValidationResponse
}