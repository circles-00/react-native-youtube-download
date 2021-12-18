import {NextFunction, Request, Response} from "express";

interface IErrorHandlerInterface {
    handleError(err: Error, req?: Request, res?: Response, next?: NextFunction): any,
    isTrustedError(err: Error): boolean | undefined
}

export default IErrorHandlerInterface