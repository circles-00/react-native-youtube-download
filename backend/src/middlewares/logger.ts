import {NextFunction, Request, Response} from 'express'
import {logger} from "../logger/Logger"

const loggerMiddleware = (req: Request, resp: Response, next: NextFunction) => {
    logger.info('Request logged:' + req.method + " " + req.path)
    next()
}

export default loggerMiddleware