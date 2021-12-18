export interface IRegisterResponse {
    message?: string;
    success: boolean;
    tokens?: {accessToken: string, refreshToken: string};
}