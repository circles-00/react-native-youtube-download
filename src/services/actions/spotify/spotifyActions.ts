import { ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { setErrors, setSpinner } from "../feedback/feedbackActions";
import axios from "axios";
import { spotify_categories_endpoint, spotify_tracks_for_playlist_endpoint } from "../../../config/api_endpoints";
import { ISetSpotifyCategoriesAction } from "../../../interfaces/actions/ISetSpotifyCategoriesAction.interface";
import { ISpotifyState } from "../../../interfaces/state/ISpotifyState.interface";
import { SET_SPOTIFY_CATEGORIES, SET_SPOTIFY_TRACKS_FOR_PLAYLIST } from "../../../store/actionTypes";
import { ISetSpotifyTracksForPlaylist } from "../../../interfaces/actions/ISetSpotifyTracksForPlaylist.interface";

export const getSpotifyCategories:
  | ActionCreator<
  ThunkAction<
    Promise<ISetSpotifyCategoriesAction>,
    any,
    null,
    ISetSpotifyCategoriesAction
    >
  >
  | ActionCreator<void> =
  () =>
    async (dispatch: Dispatch<ISetSpotifyCategoriesAction | any>) => {
      try {
        dispatch(setSpinner(true))
        const res = await axios.get(spotify_categories_endpoint.path)
        dispatch(setSpotifyCategories(res.data))
        dispatch(setSpinner(false))
      } catch (err) {
        dispatch(setSpinner(false))
        dispatch(setErrors(err.response.data.info))
      }
    }

export const setSpotifyCategories: ActionCreator<ISetSpotifyCategoriesAction> = (
  payload: ISpotifyState
) => ({
  type: SET_SPOTIFY_CATEGORIES,
  payload
})

export const getSpotifyTracksForPlaylist:
  | ActionCreator<
      ThunkAction<
        Promise<ISetSpotifyTracksForPlaylist>,
        any,
        null,
        ISetSpotifyTracksForPlaylist
      >
    >
  | ActionCreator<void> = (playlistId: string) => async (dispatch: Dispatch<ISetSpotifyTracksForPlaylist | any>) => {
  try {
    dispatch(setSpinner(true))
    const res = await axios.get(spotify_tracks_for_playlist_endpoint.path, {params: {playlistId}})
    dispatch(setSpotifyTracksForPlaylist(res.data))
    dispatch(setSpinner(false))
  } catch (err) {
    dispatch(setSpinner(false))
    dispatch(setErrors(err.response.data.info))
  }
}

export const setSpotifyTracksForPlaylist = (
  payload: ISpotifyState
): ISetSpotifyTracksForPlaylist => ({
  type: SET_SPOTIFY_TRACKS_FOR_PLAYLIST,
  payload
})