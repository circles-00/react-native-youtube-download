import { IReduxAction } from '../../../interfaces/actions/IReduxAction.interface'
import { SET_SPOTIFY_CATEGORIES } from "../../../store/actionTypes";
import { ISpotifyState } from "../../../interfaces/state/ISpotifyState.interface";

const initialState = {}

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
    default:
      return { ...state }
  }
}

export default spotifyReducer
