import { ILoginBody } from '../../../interfaces/request/ILoginBody.interface'
import { ActionCreator, Dispatch } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { IAuthTokensInterface } from '../../../interfaces/response/IAuthTokens.interface'
import { login_endpoint } from '../../../config/api_endpoints'
import { ISetAuthAction } from '../../../interfaces/actions/ISetAuthAction.interface'
import axios from 'axios'
import * as SecureStore from 'expo-secure-store'
import { SET_IS_AUTHENTICATED, SET_USER_FROM_TOKEN } from "../../../store/actionTypes";
import { IAuthState } from '../../../interfaces/state/IAuthState.interface'
import { setErrors, setSpinner } from '../feedback/feedbackActions'
import { ISetUserFromTokenAction } from "../../../interfaces/actions/ISetUserFromTokenAction.interface";
import jwtDecode from "jwt-decode";
import { isEmpty } from 'lodash'

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
      console.log('hehe')

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

export const setUserFromToken: ActionCreator<ISetUserFromTokenAction> = (payload: IAuthTokensInterface) => ({
  type: SET_USER_FROM_TOKEN,
  payload
})

export const setAuthHeaders = (accessToken: string | null) => {
  accessToken
    ? (axios.defaults.headers.common['Authorization'] = accessToken)
    : delete axios.defaults.headers.common['Authorization']
}

// TODO - Learn how to use TS for this
export const authWithAccessToken: any = () => async (dispatch: any) => {
  SecureStore.getItemAsync('accessToken').then(accessToken => {
    // TODO - decode token, if it is expired get a new access token with the refresh token(save that as well when logging in)
    const decoded = accessToken ? jwtDecode(accessToken.split(' ')[1]) : null
    dispatch(setIsAuthenticated(!isEmpty(accessToken)))
    if (decoded) dispatch(setUserFromToken(decoded))
    dispatch(setSpinner(false))
    setAuthHeaders(accessToken)
  })
}
