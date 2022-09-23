import { IReduxAction } from '../../../interfaces/actions/IReduxAction.interface'
import {
  SET_SPOTIFY_CATEGORIES,
  SET_SPOTIFY_TRACKS_FOR_PLAYLIST
} from '../../../store/actionTypes'
import { ISpotifyState } from '../../../interfaces/state/ISpotifyState.interface'

const initialState = {
  currentPlaylistTracks: []
}

const spotifyReducer = (
  state: ISpotifyState = initialState,
  action: IReduxAction
) => {
  switch (action.type) {
    case SET_SPOTIFY_CATEGORIES:
      return {
        ...state,
        categories: action.payload
      }
    case SET_SPOTIFY_TRACKS_FOR_PLAYLIST:
      return {
        ...state,
        currentPlaylistTracks: action.payload
      }
    default:
      return { ...state }
  }
}

export default spotifyReducer
