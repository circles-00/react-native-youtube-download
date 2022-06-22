import axios, { AxiosInstance } from 'axios';
import { stringify } from 'querystring';
import { CatalogsPackage } from './catalogs.package';
import { Injectable, Logger } from '@nestjs/common';
import { ISpotifyPackage } from './interfaces/definitions';

const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_AUTH_BASE_URL } =
  process.env;

@Injectable()
export class Spotify implements ISpotifyPackage {
  private static instance: Spotify;
  private readonly logger = new Logger(Spotify.name);
  client_id: string | undefined;
  client_secret: string | undefined;
  axiosInstance?: AxiosInstance;
  catalogs: CatalogsPackage;

  constructor() {
    this.client_id = SPOTIFY_CLIENT_ID;
    this.client_secret = SPOTIFY_CLIENT_SECRET;
    this.catalogs = new CatalogsPackage(this.handleError);
    this.getAccessToken()
      .then((access_token) => {
        this.logger.log('Spotify authorized!');
        this.axiosInstance = axios.create({
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });
        this.catalogs.setAxios(this.axiosInstance);
      })
      .catch((err) =>
        this.logger.error(`GET Spotify Access Token Error! - ${err}`),
      );
  }

  async getAccessToken() {
    try {
      const token = this.encodeStringToBase64(
        `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`,
      );
      const response = await axios.post(
        `${SPOTIFY_AUTH_BASE_URL}token`,
        stringify({ grant_type: 'client_credentials' }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: token,
          },
        },
      );
      return response.data.access_token;
    } catch (err) {
      throw err;
    }
  }

  encodeStringToBase64(credentials: string) {
    if (Buffer.from(credentials).byteLength !== credentials.length)
      throw new Error('Bad credentials!');
    return `Basic ${Buffer.from(credentials).toString('base64')}`;
  }

  async handleError(
    err: any,
    cb: (numOfTries: number) => Promise<void>,
    numOfTries: number,
  ) {
    if (err.response) {
      const { status } = err.response;
      if (status === 403 || status === 401) {
        if (numOfTries <= 0) throw err;
        try {
          const token = await this.getAccessToken();
          const axiosInstance = axios.create({
            headers: {
              Authorization: 'Bearer ' + token.access_token,
            },
          });
          this.catalogs.setAxios(axiosInstance);
          return cb(--numOfTries);
        } catch (err) {
          throw err;
        }
      }
    } else throw err;
  }
}
