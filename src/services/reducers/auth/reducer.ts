import { IReduxAction } from '../../../interfaces/actions/IReduxAction.interface'
import { IAuthState } from '../../../interfaces/state/IAuthState.interface'
import { SET_IS_AUTHENTICATED } from '../../../store/actionTypes'

const initialState = {
  isAuthenticated: false
}

const authReducer = (
  state: IAuthState = initialState,
  action: IReduxAction
) => {
  switch (action.type) {
    case SET_IS_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: action.payload
      }
    default:
      return { ...state }
  }
}

export default authReducer
