import { IErrorsState } from './IErrorsState.interface'

export interface IFeedbackState {
  errors?: IErrorsState
  showSpinner: boolean
}
