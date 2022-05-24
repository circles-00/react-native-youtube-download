import { SET_ERRORS, SET_SPINNER } from '../../../store/actionTypes'
import { IErrorsState } from '../../../interfaces/state/IErrorsState.interface'
import { ISetErrorsAction } from '../../../interfaces/actions/ISetErrorsAction.interface'
import { ISetSpinnerAction } from '../../../interfaces/actions/ISetSpinnerAction.interface'

export const setErrors = (
  payload: IErrorsState
): ISetErrorsAction => ({
  type: SET_ERRORS,
  payload
})

export const setSpinner = (
  payload: boolean
): ISetSpinnerAction => ({
  type: SET_SPINNER,
  payload
})
