import { IReduxAction } from '../../../interfaces/actions/IReduxAction.interface'
import { IFeedbackState } from '../../../interfaces/state/IFeedbackState.interface'
import { SET_ERRORS, SET_SPINNER } from '../../../store/actionTypes'

const initialState = {
  showSpinner: true
}

const feedbackReducer = (
  state: IFeedbackState = initialState,
  action: IReduxAction
) => {
  switch (action.type) {
    case SET_ERRORS:
      return {
        ...state,
        errors: action.payload
      }
    case SET_SPINNER:
      return {
        ...state,
        showSpinner: action.payload
      }
    default:
      return { ...state }
  }
}

export default feedbackReducer
