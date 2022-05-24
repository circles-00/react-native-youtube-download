import { IErrorsState } from '../state/IErrorsState.interface'
import { SET_ERRORS } from "../../store/actionTypes";

export interface ISetErrorsAction {
  type: typeof SET_ERRORS
  payload: IErrorsState
}
