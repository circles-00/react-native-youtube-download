import express, { Request, Response, NextFunction } from "express";
import IControllerBase from "../../interfaces/controllers/IControllerBase.interface";
import IEndpoint from "../../interfaces/controllers/IEndpoint.interface";
import { IAuthMiddlewares } from "../../interfaces/controllers/middlewares/IAuthMiddlewares.interface";
import { IAuthService } from "../../interfaces/services/IAuthService.interface";
import { AuthMiddlewares } from "./AuthMiddlewares";
import isEmpty from 'lodash.isempty'
import { ILoginCredentials } from "../../interfaces/models/ILoginCredentials.interface";
import { IRegisterBody } from "../../interfaces/models/IRegisterBody.interface";

class AuthController implements IControllerBase {

    public basePath = '/api/auth'
    public router = express.Router()

    public endpoints: Array<IEndpoint> = [
        {
            name: 'Login',
            path: '/login',
            requestHandler: this.login.bind(this),
            method: 'post'
        },
        {
            name: 'Register',
            path: '/register',
            requestHandler: this.register.bind(this),
            method: 'post'
        }
    ]

    constructor(private authService: IAuthService, private middlewares: IAuthMiddlewares = new AuthMiddlewares()) {
        this.initRoutes()
    }

    public initRoutes() {
        this.endpoints.forEach((endpoint: IEndpoint) => {
            if (!isEmpty(endpoint.middlewares) && endpoint.middlewares) this.router[endpoint.method](this.basePath + endpoint.path, ...endpoint.middlewares.map(el => el), endpoint.requestHandler)
            else this.router[endpoint.method](this.basePath + endpoint.path, endpoint.requestHandler)
        })
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password }: ILoginCredentials = req.body
            const result = await this.authService.login({email, password})
            console.log(result)
            return res.status(200).json(result)
        } catch (err) {
            console.log('auth err', err)
            next(err)
        }
    }

    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const body: IRegisterBody = req.body
            const result = await this.authService.register(body)

            return res.status(200).send(result)
        } catch (err) {
            next(err)
        }
    }
}

export default AuthController