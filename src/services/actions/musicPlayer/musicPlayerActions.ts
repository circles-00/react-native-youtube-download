import {
  SET_CURRENT_PLAYLIST_TRACKS, SET_CURRENT_SONG,
  SET_IS_PLAY, SET_PLAYING_ACTION
} from "../../../store/actionTypes";
import { ISetIsPlay } from "../../../interfaces/actions/ISetIsPlay.interface";
import {
  IMusicPlayerActions,
  ISetCurrentPlaylistTracks,
  ISetCurrentSongIdx,
  ISetCurrentSongProcess
} from "../../../interfaces/types";
import { Track } from "react-native-track-player";


export const setCurrentSong = (payload: Track): ISetCurrentSongIdx => ({
  type: SET_CURRENT_SONG,
  payload
})

export const setCurrentPlaylistTracks = (payload: Array<any>): ISetCurrentPlaylistTracks => ({
  type: SET_CURRENT_PLAYLIST_TRACKS,
  payload
})


export const setMusicAction = (payload: IMusicPlayerActions) => ({
  type: SET_PLAYING_ACTION,
  payload
})

export const setIsPlay = (payload: boolean): ISetIsPlay => ({
  type: SET_IS_PLAY,
  payload
})