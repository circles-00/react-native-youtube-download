import express, { Request, Response, NextFunction } from "express";
import IControllerBase from "../../interfaces/controllers/IControllerBase.interface";
import IEndpoint from "../../interfaces/controllers/IEndpoint.interface";
import isEmpty from 'lodash.isempty'
import { ISpotifyMiddlewares } from "../../interfaces/controllers/middlewares/ISpotifyMiddlewares.interface";
import { SpotifyMiddlewares } from "./SpotifyMiddlewares";
import { ISpotifyService } from "../../interfaces/services/ISpotifyService.interface";
import { logger } from "../../logger/Logger";
const ffmpeg = require('fluent-ffmpeg');
const ytdl = require('ytdl-core');
const Chunker = require('stream-chunker');

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
    },
    {
      name: 'Stream Song',
      path: '/stream-song',
      requestHandler: this.streamSong.bind(this),
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

  async streamSong(req: Request, res: Response, next: NextFunction) {
    try {
      const { remoteAddress: clientIp } = req.socket
      const { songName } = req.query
      const songUrl = await this.spotifyService.getSongUrl(songName as string)

      // Audio format header (OPTIONAL)
      res.set({ "Content-Type": "audio/mp3", 'accept-ranges': 'bytes' });

      // Chunk data
      const chunker = Chunker(16);

      chunker.on('data', (chunk: any) => {
        res.write(chunk);
      });

      chunker.on('error', () => logger.info(`Stream from client with IP ${clientIp} closed`))

      chunker.on('end', () => {
        res.end()
      })

      // Send compressed audio mp3 data
      ffmpeg()
        .input(ytdl(songUrl))
        .toFormat('mp3')
        .pipe(chunker);
    } catch(err) {
      next(err)
    }
  }
}

export default SpotifyController