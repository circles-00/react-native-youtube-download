import { IReduxAction } from '../../../interfaces/actions/IReduxAction.interface'
import { IMusicPlayerState } from "../../../interfaces/state/IMusicPlayerState.interface";
import {
  SET_IS_INIT_PLAY,
  SET_IS_PLAY,
  SET_SONG_ARTIST,
  SET_SONG_COVER_ART,
  SET_SONG_NAME,
  SET_SOUND
} from "../../../store/actionTypes";

const initialState = {
  songName: '',
  artistName: '',
  isInitPlay: true,
  sound: null,
  isPlay: false,
  image: ''
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
    default:
      return { ...state }
  }
}

export default spotifyReducer
