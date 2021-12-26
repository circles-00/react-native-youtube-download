import { Middlewares } from '../Middlewares'
import {NextFunction, Request, Response} from 'express'
import jwtDecodeMiddleware from '../../middlewares/jwtDecodeMiddleware';
import { ISpotifyMiddlewares } from "../../interfaces/controllers/middlewares/ISpotifyMiddlewares.interface";


export class SpotifyMiddlewares extends Middlewares implements ISpotifyMiddlewares {
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