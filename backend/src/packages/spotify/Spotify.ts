import { ISpotifyPackage } from '../../interfaces/packages/ISpotifyPackage.interface'
import axios, { AxiosInstance } from "axios";
import { logger } from "../../logger/Logger";
import { stringify } from "querystring";

const {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  SPOTIFY_AUTH_BASE_URL
} = process.env

class Spotify implements ISpotifyPackage {
  client_id: string | undefined
  client_secret: string | undefined
  axiosInstance?: AxiosInstance

  constructor(client_id: string | undefined, client_secret: string | undefined) {
    this.client_id = client_id
    this.client_secret = client_secret
    this.getAccessToken().then(access_token => {
      logger.info('Spotify authorized!')
      this.axiosInstance = axios.create({
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      })
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
}

const SpotifyInstance = new Spotify(SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET)

export = SpotifyInstance