import { SET_SONG_COVER_ART } from "../../store/actionTypes";

export interface ISetSongCover {
  type: typeof SET_SONG_COVER_ART
  payload: string
}