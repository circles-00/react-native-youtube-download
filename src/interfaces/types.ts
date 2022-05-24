import { SET_CURRENT_PLAYLIST_TRACKS, SET_CURRENT_SONG, SET_CURRENT_SONG_PROCESS } from "../store/actionTypes";
import { Track } from "react-native-track-player";

export interface ISetCurrentSongIdx {
  type: typeof SET_CURRENT_SONG
  payload: Track | undefined
}

export interface ISetCurrentPlaylistTracks {
  type: typeof SET_CURRENT_PLAYLIST_TRACKS
  payload: Array<any>
}

export interface ISetCurrentSongProcess {
  type: typeof SET_CURRENT_SONG_PROCESS
  payload: boolean
}

export type IMusicPlayerActions = 'startPause' | 'stop' | 'next' | 'prev' | 'initial'