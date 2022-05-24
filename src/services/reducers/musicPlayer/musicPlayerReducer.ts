import { IReduxAction } from '../../../interfaces/actions/IReduxAction.interface'
import { IMusicPlayerState } from "../../../interfaces/state/IMusicPlayerState.interface";
import {
  SET_CURRENT_PLAYLIST_TRACKS, SET_CURRENT_SONG,
  SET_IS_PLAY, SET_PLAYING_ACTION
} from "../../../store/actionTypes";

const initialState = {
  isPlay: false,
  currentPlaylistTracks: [],
  currentSong: {}
}

const spotifyReducer = (
  state: IMusicPlayerState = initialState,
  action: IReduxAction
) => {
  switch (action.type) {
    case SET_IS_PLAY:
      return {
        ...state,
        isPlay: action.payload
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
