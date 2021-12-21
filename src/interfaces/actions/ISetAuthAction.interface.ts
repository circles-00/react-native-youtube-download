import { Action } from 'redux'
import { SET_IS_AUTHENTICATED } from '../../store/actionTypes'
import { IAuthState } from '../state/IAuthState.interface'

export interface ISetAuthAction extends Action<typeof SET_IS_AUTHENTICATED> {
  payload: IAuthState
}
