import { AxiosInstance } from 'axios';
import { CatalogsPackage } from '../../catalogs.package';

export interface ISpotifyCatalogs {
  handleError: (
    err: any,
    cb: (numOfTries: number) => Promise<void>,
    numOfTries: number,
  ) => void;
  axiosInstance?: AxiosInstance;
}

export interface ISpotifyPackage {
  client_id: string | undefined;
  client_secret: string | undefined;
  getAccessToken(): Promise<void>;
  encodeStringToBase64(credentials: string): string;
  axiosInstance?: AxiosInstance;
  catalogs: CatalogsPackage;
}
