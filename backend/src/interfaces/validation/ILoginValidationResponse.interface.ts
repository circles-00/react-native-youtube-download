import { ILoginErrors } from "../errors/ILoginErrors";

export interface ILoginValidationResponse {
    errors: ILoginErrors;
    isValid: boolean;
}