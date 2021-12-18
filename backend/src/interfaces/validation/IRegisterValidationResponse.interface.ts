import {IRegisterErrors} from '../errors/IRegisterErrors'

export interface IRegisterValidationResponse {
    errors: IRegisterErrors,
    isValid: boolean
}