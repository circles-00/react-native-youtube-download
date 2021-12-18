import { IAuthMiddlewares } from '../../interfaces/controllers/middlewares/IAuthMiddlewares.interface';
import { Middlewares } from '../Middlewares'
import express, {NextFunction, Request, RequestHandler, Response} from 'express'
import jwtDecodeMiddleware from '../../middlewares/jwtDecodeMiddleware';


export class AuthMiddlewares extends Middlewares implements IAuthMiddlewares {
    constructor() {
        super();
    }

    public setToken(req: Request, res: Response, next: NextFunction) {
        const {params: {token}} = req
        if (token) req.headers['authorization'] = 'Bearer ' + token
        next()
    }

    public jwtDecode = jwtDecodeMiddleware
}