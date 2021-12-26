import { ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { setErrors, setSpinner } from "../feedback/feedbackActions";
import axios from "axios";
import { spotify_categories_endpoint } from "../../../config/api_endpoints";
import { ISetSpotifyCategoriesAction } from "../../../interfaces/actions/ISetSpotifyCategoriesAction.interface";
import { ISpotifyState } from "../../../interfaces/state/ISpotifyState.interface";
import { SET_SPOTIFY_CATEGORIES } from "../../../store/actionTypes";


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
