import { ILoginBody } from '../../../interfaces/request/ILoginBody.interface'
import { ActionCreator, Dispatch } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { IAuthTokensInterface } from '../../../interfaces/response/IAuthTokens.interface'
import { login_endpoint } from '../../../config/api_endpoints'
import { ISetAuthAction } from '../../../interfaces/actions/ISetAuthAction.interface'
import axios from 'axios'
import * as SecureStore from 'expo-secure-store'
import { SET_IS_AUTHENTICATED } from '../../../store/actionTypes'
import { IAuthState } from '../../../interfaces/state/IAuthState.interface'
import { setErrors, setSpinner } from '../feedback/feedbackActions'

export const login:
  | ActionCreator<
      ThunkAction<
        Promise<ISetAuthAction>,
        IAuthTokensInterface,
        null,
        ISetAuthAction
      >
    >
  | ActionCreator<void> =
  (credentials: ILoginBody) =>
  async (dispatch: Dispatch<ISetAuthAction | any>) => {
    try {
      dispatch(setSpinner(true))
      const res = await axios.post(login_endpoint.path, credentials)
      await SecureStore.setItemAsync('accessToken', res.data.accessToken)
      dispatch(setIsAuthenticated(true))
      dispatch(setSpinner(false))
    } catch (err) {
      dispatch(setSpinner(false))
      dispatch(setErrors(err.response.data.info))
    }
  }

export const setIsAuthenticated: ActionCreator<ISetAuthAction> = (
  payload: IAuthState
) => ({
  type: SET_IS_AUTHENTICATED,
  payload
})
