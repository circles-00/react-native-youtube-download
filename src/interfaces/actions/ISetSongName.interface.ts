import { SET_SONG_NAME } from "../../store/actionTypes";

export interface ISetSongName {
  type: typeof SET_SONG_NAME
  payload: string
}