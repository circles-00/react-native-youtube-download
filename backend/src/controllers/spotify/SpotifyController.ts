import express, { Request, Response, NextFunction } from "express";
import IControllerBase from "../../interfaces/controllers/IControllerBase.interface";
import IEndpoint from "../../interfaces/controllers/IEndpoint.interface";
import isEmpty from 'lodash.isempty'
import { ISpotifyMiddlewares } from "../../interfaces/controllers/middlewares/ISpotifyMiddlewares.interface";
import { SpotifyMiddlewares } from "./SpotifyMiddlewares";
import { ISpotifyService } from "../../interfaces/services/ISpotifyService.interface";

class SpotifyController implements IControllerBase {

  public basePath = '/api/spotify'
  public router = express.Router()

  public endpoints: Array<IEndpoint> = [
    {
      name: 'Categories',
      path: '/categories',
      requestHandler: this.getCategories.bind(this),
      method: 'get'
    },
    {
      name: 'Playlist Tracks',
      path: '/playlist/tracks',
      requestHandler: this.getTracksForPlaylist.bind(this),
      method: 'get'
    }
  ]

  constructor(private spotifyService: ISpotifyService, private middlewares: ISpotifyMiddlewares = new SpotifyMiddlewares()) {
    this.initRoutes()
  }

  public initRoutes() {
    this.endpoints.forEach((endpoint: IEndpoint) => {
      if (!isEmpty(endpoint.middlewares) && endpoint.middlewares) this.router[endpoint.method](this.basePath + endpoint.path, ...endpoint.middlewares.map(el => el), endpoint.requestHandler)
      else this.router[endpoint.method](this.basePath + endpoint.path, endpoint.requestHandler)
    })
  }

  async getCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await this.spotifyService.getCategories()

      res.status(200).json(categories)
    } catch (err) {
      next(err)
    }
  }

  async getTracksForPlaylist(req: Request, res: Response, next: NextFunction) {
    try {
      const { playlistId } = req.query
      const tracks = await this.spotifyService.getTracksForPlaylist(playlistId as string)

      res.status(200).json(tracks)
    } catch (err) {
      next(err)
    }
  }
}

export default SpotifyController