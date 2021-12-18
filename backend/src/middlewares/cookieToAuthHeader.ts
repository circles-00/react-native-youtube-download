import {NextFunction, Request, Response} from "express";

const cookieToAuthHeader = (req: Request, res: Response, next: NextFunction) => {
    const {accessToken} = req.cookies
    req.headers['authorization'] = accessToken
    next()
}

export default cookieToAuthHeader