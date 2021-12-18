import {NextFunction, Request, Response} from "express";
import JWTService from "../authorization/JWTService";
import HTTPError from "../errors/HTTPError";

export default async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1]
    if (!token) return next(new HTTPError({message: 'Unauthorized'}, 'Unauthorized',"Unauthorized", 401))
    const jwtService = new JWTService()
    req.user = jwtService.decode(token)
    try {
        await jwtService.verify(token)
        next()
    } catch (err: any) {
        console.log("err", err)
        next(err)
    }
}
