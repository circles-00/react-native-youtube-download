import BaseError from "./BaseError";
import {logger} from "../logger/Logger";
import {Response, Request, NextFunction} from "express";
import IErrorHandlerInterface from "../interfaces/errors/IErrorHandler.interface";

class ErrorHandler implements IErrorHandlerInterface {
        public handleError(err: any, req: Request, res: Response, next: NextFunction): any {
            logger.error('Error handler ', err);
            const statusCode: number = +err?.httpCode || 500
            return res.status(statusCode).send(err)
    }

    public isTrustedError(error: Error) {
        if (error instanceof BaseError) {
            return (<BaseError>error).isOperational;
        }
        return false;
    }
}
export const errorHandler = new ErrorHandler();