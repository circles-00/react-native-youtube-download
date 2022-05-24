import { SET_SONG_ARTIST } from "../../store/actionTypes";

export interface ISetArtistName {
  type: typeof SET_SONG_ARTIST
  payload: string
}