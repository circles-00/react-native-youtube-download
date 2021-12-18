import JWT from 'jsonwebtoken'

export interface IJWTService {
    sign: (payload: any, options?: JWT.SignOptions ) => string,
    generateAuthTokens: (payload: any) => {accessToken: string; refreshToken: string},
    decode: (token: string) => any
}