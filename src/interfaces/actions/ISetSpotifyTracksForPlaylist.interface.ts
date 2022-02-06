import { ISpotifyState } from "../state/ISpotifyState.interface";
import { Action } from "redux";
import { SET_SPOTIFY_TRACKS_FOR_PLAYLIST } from "../../store/actionTypes";

export interface ISetSpotifyTracksForPlaylist extends Action<typeof SET_SPOTIFY_TRACKS_FOR_PLAYLIST>  {
  payload: ISpotifyState
}