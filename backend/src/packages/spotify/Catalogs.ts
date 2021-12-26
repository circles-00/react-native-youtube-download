import { ISpotifyCatalogs } from "../../interfaces/packages/ISpotifyCatalogs.interface";
import { AxiosInstance } from "axios";

const { SPOTIFY_BASE_URL } = process.env

class Catalogs implements ISpotifyCatalogs {
  handleError: (
    err: any,
    cb: (numOfTries: number) => Promise<void>,
    numOfTries: number
  ) => void
  axiosInstance?: AxiosInstance;

  constructor(
    handleError: (
      err: any,
      cb: (numOfTries: number) => Promise<void>,
      numOfTries: number
    ) => void,
  ) {
    this.handleError = handleError
  }

  setAxios(axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance
  }

  async getCategories() {
    try {
      // @ts-ignore
      const result = await this.axiosInstance.get(`${SPOTIFY_BASE_URL}browse/categories`)
      return result.data.categories
    } catch(err) {
      // this.handleError(err, this.getCategories(numOfTries), numOfTries)
      throw err
    }
  }

  async getCategoryPlaylists(category: string) {
    try {
      // @ts-ignore
      const result = await this.axiosInstance.get(`${SPOTIFY_BASE_URL}browse/categories/${category}/playlists`)
      return result.data.playlists.items
    } catch (err) {
      throw err
    }
  }

  async getPlaylistTracks(playlistId: string) {
    try {
      // @ts-ignore
      const result = await this.axiosInstance.get(`${SPOTIFY_BASE_URL}playlists/${playlistId}/tracks`)
      return result.data.items.map((item: any) => item.track)
    } catch(err) {
      throw err
    }
  }
}

export = Catalogs
