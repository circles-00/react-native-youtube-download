import JWTService from "../../authorization/JWTService";
import HTTPError from "../../errors/HTTPError";
import { ILoginCredentials } from "../../interfaces/models/ILoginCredentials.interface";
import { ILoginResponse } from "../../interfaces/models/ILoginResponse.interface";
import IUsersRepository from "../../interfaces/repositories/IUsersRepository.interface";
import { IAuthService } from "../../interfaces/services/IAuthService.interface";
import { IJWTService } from "../../interfaces/services/IJWTService.interface";
import { IValidationService } from "../../interfaces/services/IValidationService.interface";
import bcrypt from 'bcryptjs'
import { IRegisterBody } from "../../interfaces/models/IRegisterBody.interface";
import { IRegisterResponse } from "../../interfaces/models/IRegsiterResponse";
import { AuthMessages } from "../../enums/AuthMessages";

class AuthService implements IAuthService {
    constructor(private validationService: IValidationService, private usersRepository: IUsersRepository,
                private jwtService: IJWTService = new JWTService()) {
    }

    async login(credentials: ILoginCredentials): Promise<ILoginResponse> {
        const {errors, isValid} = this.validationService.login(credentials)
        if (!isValid) throw new HTTPError(errors, 'ValidationError', 'Bad request', 400)
        const user = await this.usersRepository.findByEmail(credentials.email)
        if (!user) throw new HTTPError({email: 'User does not exists'}, 'BadRequest', 'User does not exist', 400)

        const isMatch = await bcrypt.compare(credentials.password, user.password)
        if(!isMatch)throw new HTTPError({password: "Wrong password"}, 'ValidationError','Password doesnt match', 400)

        // @ts-ignore
        delete user.password
        return this.jwtService.generateAuthTokens(user)
    }

    async register(credentials: IRegisterBody): Promise<IRegisterResponse> {
        const {errors, isValid} = this.validationService.register(credentials)
        if (!isValid) throw new HTTPError(errors, 'ValidationError','Bad request', 400, 'Invalid body', true)

        const existingUser = await this.usersRepository.findByEmail(credentials.email)

        if(existingUser) throw new HTTPError({instagram_username: "This user is already registered"}, 'BadRequest','User already exist', 400)

        let createdUser
        credentials.password = bcrypt.hashSync(credentials.password, 12)
        // @ts-ignore
        delete credentials.confirm_password
        if (!existingUser) createdUser = await this.usersRepository.createUser(credentials)

        let tokens
        if(createdUser) {
            tokens = this.jwtService.generateAuthTokens(createdUser)
        }

        return {message: AuthMessages.REGISTERED_USER, success: true, tokens}
    }
}

export default AuthService