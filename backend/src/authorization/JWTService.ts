import JWT from 'jsonwebtoken'
import keys from "../config/keys";
import jwtDecoder from 'jwt-decode'
import { IJWTService } from '../interfaces/services/IJWTService.interface';
import { ILoginResponse } from '../interfaces/models/ILoginResponse.interface';

// TODO: make proper types and move secret
class JWTService implements IJWTService{
    constructor(private jwt: typeof JWT = JWT, private secret: string = keys.jwt.secretOrKey, private jwtDecode: any = jwtDecoder) {}

    sign(payload: any, options: JWT.SignOptions = {expiresIn: keys.jwt.accessToken.expiresIn} ) {
        return this.jwt.sign(payload, this.secret, options)
    }

    // TODO: get sign options from a config file
    generateAuthTokens(payload: any): ILoginResponse {
        const accessToken = this.sign(payload,{expiresIn: "24h"} )
        const refreshToken = this.generateRefreshToken(payload)

        return {accessToken, refreshToken}
    }

    generateRefreshToken(payload: any) {
        const refreshToken = this.sign(payload, {expiresIn: "1y"})
        // add refreshToken to database
        return refreshToken
    }

    decode(token: string) {
        return this.jwtDecode(token)
    }

    verify(token: string) {
        return this.jwt.verify(token, this.secret)
    }
}

export default JWTService
