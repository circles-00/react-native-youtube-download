import { ActionCreator, Dispatch } from "redux";
import { ISetIsInitPlay } from "../../../interfaces/actions/ISetIsInitPlay.interface";
import {
  SET_CURRENT_PLAYLIST_TRACKS,
  SET_CURRENT_SONG, SET_CURRENT_SONG_PROCESS,
  SET_IS_INIT_PLAY,
  SET_IS_PLAY, SET_PLAYING_ACTION,
  SET_SONG_ARTIST,
  SET_SONG_COVER_ART,
  SET_SONG_NAME, SET_SONG_UNLOADED,
  SET_SOUND
} from "../../../store/actionTypes";
import { ISetIsPlay } from "../../../interfaces/actions/ISetIsPlay.interface";
import { ISetSongName } from "../../../interfaces/actions/ISetSongName.interface";
import { ISetArtistName } from "../../../interfaces/actions/ISetArtistName.interface";
import { ISetSongCover } from "../../../interfaces/actions/ISetSongCover.interface";
import {
  IMusicPlayerActions,
  ISetCurrentPlaylistTracks,
  ISetCurrentSongIdx,
  ISetCurrentSongProcess
} from "../../../interfaces/types";
import { Track } from "react-native-track-player";

export const setIsInitPlay= (payload: boolean): ISetIsInitPlay => ({
  type: SET_IS_INIT_PLAY,
  payload
})

export const setIsPlay = (payload: boolean): ISetIsPlay => ({
  type: SET_IS_PLAY,
  payload
})

export const setSound = (payload: any) => ({
  type: SET_SOUND,
  payload
})

export const setSongName = (payload: string): ISetSongName => ({
  type: SET_SONG_NAME,
  payload
})


export const setArtistName = (
  payload: string
): ISetArtistName => ({
  type: SET_SONG_ARTIST,
  payload
})

export const setImage = (
  payload: string
): ISetSongCover => ({
  type: SET_SONG_COVER_ART,
  payload
})

export const setCurrentSong = (payload: Track): ISetCurrentSongIdx => ({
  type: SET_CURRENT_SONG,
  payload
})

export const setCurrentPlaylistTracks = (payload: Array<any>): ISetCurrentPlaylistTracks => ({
  type: SET_CURRENT_PLAYLIST_TRACKS,
  payload
})

export const setCurrentSongProcess = (payload: boolean): ISetCurrentSongProcess => ({
  type: SET_CURRENT_SONG_PROCESS,
  payload
})

export const setCurrentPlayingSong = (songName: string, artists: string, image: string, itemIndex: number, tracks: Array<any>) => async (dispatch: Dispatch<any>) => {
  dispatch(setIsInitPlay(true))
  dispatch(setSongName(songName))
  dispatch(setArtistName(artists))
  dispatch(setImage(image))
  dispatch(setCurrentSong(itemIndex))
  dispatch(setCurrentPlaylistTracks(tracks))
  dispatch(setCurrentSongProcess(true))
}

export const setSongUnloaded = (payload: boolean) => ({
  type: SET_SONG_UNLOADED,
  payload
})

export const setMusicAction = (payload: IMusicPlayerActions) => ({
  type: SET_PLAYING_ACTION,
  payload
})