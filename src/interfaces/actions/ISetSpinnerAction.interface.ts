import { SET_SPINNER } from "../../store/actionTypes";

export interface ISetSpinnerAction {
  type: typeof SET_SPINNER
  payload: boolean
}
