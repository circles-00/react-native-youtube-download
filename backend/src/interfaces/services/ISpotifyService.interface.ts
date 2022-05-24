import {ILoginCredentials} from '../models/ILoginCredentials.interface'
import { ILoginResponse } from '../models/ILoginResponse.interface';
import { IRegisterBody } from '../models/IRegisterBody.interface';
import { IRegisterResponse } from '../models/IRegsiterResponse';

export interface ISpotifyService {
  getCategories: () => Promise<any>
  getTracksForPlaylist: (playlistId: string, hostName: string) => Promise<any>
  getSongUrl: (songName: string) => Promise<any>
}