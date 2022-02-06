import { ActionCreator } from "redux";
import { ISetIsInitPlay } from "../../../interfaces/actions/ISetIsInitPlay.interface";
import {
  SET_IS_INIT_PLAY,
  SET_IS_PLAY,
  SET_SONG_ARTIST,
  SET_SONG_COVER_ART,
  SET_SONG_NAME,
  SET_SOUND
} from "../../../store/actionTypes";
import { ISetIsPlay } from "../../../interfaces/actions/ISetIsPlay.interface";
import { ISetSongName } from "../../../interfaces/actions/ISetSongName.interface";
import { ISetArtistName } from "../../../interfaces/actions/ISetArtistName.interface";
import { ISetSongCover } from "../../../interfaces/actions/ISetSongCover.interface";

export const setIsInitPlay: ActionCreator<ISetIsInitPlay> = (payload: boolean) => ({
  type: SET_IS_INIT_PLAY,
  payload
})

export const setIsPlay: ActionCreator<ISetIsPlay> = (payload: boolean) => ({
  type: SET_IS_PLAY,
  payload
})

export const setSound: ActionCreator<any> = (payload: any) => ({
  type: SET_SOUND,
  payload
})

export const setSongName: ActionCreator<ISetSongName> = (payload: string) => ({
  type: SET_SONG_NAME,
  payload
})


export const setArtistName: ActionCreator<ISetArtistName> = (
  payload: string
) => ({
  type: SET_SONG_ARTIST,
  payload
})

export const setImage: ActionCreator<ISetSongCover> = (
  payload: string
) => ({
  type: SET_SONG_COVER_ART,
  payload
})
