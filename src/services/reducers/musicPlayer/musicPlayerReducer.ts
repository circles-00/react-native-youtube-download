import { IReduxAction } from '../../../interfaces/actions/IReduxAction.interface'
import { IMusicPlayerState } from "../../../interfaces/state/IMusicPlayerState.interface";
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

const initialState = {
  songName: '',
  artistName: '',
  isInitPlay: true,
  sound: null,
  isPlay: false,
  image: '',
  currentPlaylistTracks: [],
  songUnloaded: true,
  isSongProcessFinished: false,
  currentSong: {}
}

const spotifyReducer = (
  state: IMusicPlayerState = initialState,
  action: IReduxAction
) => {
  switch (action.type) {
    case SET_IS_INIT_PLAY:
      return {
        ...state,
        isInitPlay: action.payload
      }
    case SET_IS_PLAY:
      return {
        ...state,
        isPlay: action.payload
      }
    case SET_SOUND:
      return {
        ...state,
        sound: action.payload
      }
    case SET_SONG_NAME:
      return {
        ...state,
        songName: action.payload
      }
    case SET_SONG_ARTIST:
      return {
        ...state,
        artistName: action.payload
      }
    case SET_SONG_COVER_ART:
      return {
        ...state,
        image: action.payload
      }
    case SET_CURRENT_SONG:
      return {
        ...state,
        currentSong: action.payload
      }
    case SET_CURRENT_PLAYLIST_TRACKS:
      return {
        ...state,
        currentPlaylistTracks: action.payload
      }
    case SET_SONG_UNLOADED:
      return {
        ...state,
        songUnloaded: action.payload
      }
    case SET_CURRENT_SONG_PROCESS:
      return {
        ...state,
        isSongProcessFinished: action.payload
      }
    case SET_PLAYING_ACTION:
      return {
        ...state,
        musicPlayerAction: action.payload
      }
    default:
      return { ...state }
  }
}

export default spotifyReducer
