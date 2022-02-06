import { ISpotifyPackage } from '../../interfaces/packages/ISpotifyPackage.interface'
import axios, { AxiosInstance } from "axios";
import { logger } from "../../logger/Logger";
import { stringify } from "querystring";
import Catalogs from './Catalogs'

const {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  SPOTIFY_AUTH_BASE_URL
} = process.env

class Spotify implements ISpotifyPackage {
  client_id: string | undefined
  client_secret: string | undefined
  axiosInstance?: AxiosInstance
  catalogs: Catalogs

  constructor(client_id: string | undefined, client_secret: string | undefined) {
    this.client_id = client_id
    this.client_secret = client_secret
    this.catalogs = new Catalogs(this.handleError)
    this.getAccessToken().then(access_token => {
      logger.info('Spotify authorized!')
      this.axiosInstance = axios.create({
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      })
      this.catalogs.setAxios(this.axiosInstance)
    }).catch(err => logger.error(`GET Spotify Access Token Error! - ${err}`))
  }

  async getAccessToken() {
    try {
      const token = this.encodeStringToBase64(
        `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
      )
      const response = await axios.post(
        `${SPOTIFY_AUTH_BASE_URL}token`,
        stringify({grant_type: 'client_credentials'}),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: token
          }
        }
      )
      return response.data.access_token
    } catch (err) {
      throw err
    }
  }

  encodeStringToBase64(credentials: string) {
    if (Buffer.from(credentials).byteLength !== credentials.length) throw new Error('Bad credentials!')
    return `Basic ${Buffer.from(credentials).toString('base64')}`
  }

  async handleError(err: any, cb: (numOfTries: number) => Promise<void>, numOfTries: number) {
    if(err.response) {
      const { status, data } = err.response
      if (status === 403 || status === 401) {
        if (numOfTries <= 0) throw err
        try {
          const token = await SpotifyInstance.getAccessToken()
          const axiosInstance = axios.create({
            headers: {
              Authorization: 'bearer ' + token.access_token
            }
          })
          SpotifyInstance.catalogs.setAxios(axiosInstance)
          return cb(--numOfTries)
        } catch (err) {
          throw err
        }
      }
    } else throw err
  }
}

const SpotifyInstance = new Spotify(SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET)

export = SpotifyInstance