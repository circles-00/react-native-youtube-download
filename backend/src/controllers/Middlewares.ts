import passport from "passport";
import { IMiddlewares } from "../interfaces/controllers/IMiddlewares";

export class Middlewares implements IMiddlewares {
    constructor() {
    }

    public authenticate = passport.authenticate('jwt', { session: false })
}