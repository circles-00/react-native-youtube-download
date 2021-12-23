import { AxiosInstance } from "axios";

export interface ISpotifyPackage {
  client_id: string | undefined,
  client_secret: string | undefined,
  getAccessToken(): Promise<void>
  encodeStringToBase64(credentials: string): string
  axiosInstance?: AxiosInstance
}