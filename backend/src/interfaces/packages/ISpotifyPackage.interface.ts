import { AxiosInstance } from "axios";
import Catalogs from "../../packages/spotify/Catalogs";

export interface ISpotifyPackage {
  client_id: string | undefined,
  client_secret: string | undefined,
  getAccessToken(): Promise<void>
  encodeStringToBase64(credentials: string): string
  axiosInstance?: AxiosInstance
  catalogs: Catalogs
}