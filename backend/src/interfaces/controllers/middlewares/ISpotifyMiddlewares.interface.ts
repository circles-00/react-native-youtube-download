import { IMiddlewares } from "../IMiddlewares";
import { RequestHandler } from "express";

export interface ISpotifyMiddlewares extends IMiddlewares {
  setToken: RequestHandler,
  jwtDecode: RequestHandler
}