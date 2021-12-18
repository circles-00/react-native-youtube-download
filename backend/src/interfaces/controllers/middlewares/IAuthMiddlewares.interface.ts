import { RequestHandler } from "express";
import { IMiddlewares } from "../IMiddlewares";

export interface IAuthMiddlewares extends IMiddlewares {
    setToken: RequestHandler,
    jwtDecode: RequestHandler
}