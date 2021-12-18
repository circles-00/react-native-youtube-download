import { RequestHandler } from "express";

export interface IMiddlewares {
    authenticate: RequestHandler
}