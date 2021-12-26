import { ISpotifyState } from "../state/ISpotifyState.interface";
import { Action } from "redux";
import { SET_SPOTIFY_CATEGORIES } from "../../store/actionTypes";

export interface ISetSpotifyCategoriesAction extends Action<typeof SET_SPOTIFY_CATEGORIES>  {
  payload: ISpotifyState
}