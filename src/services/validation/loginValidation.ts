import { ILoginBody } from '../../interfaces/request/ILoginBody.interface'
import { IErrorsState } from '../../interfaces/state/IErrorsState.interface'
import isEmail from 'validator/lib/isEmail'
import isEmpty from 'lodash.isempty'

const loginValidation = ({ email, password }: ILoginBody) => {
  const errors: IErrorsState = {}

  if (isEmpty(email)) {
    errors.email = 'Email cannot be empty'
  } else if (!isEmail(email)) {
    errors.email = 'Please enter a valid email address'
  }

  if (isEmpty(password)) {
    errors.password = 'Password cannot be empty'
  } else if (password.length < 8) {
    errors.password = 'Password must be at least 8 characters long'
  }

  return { errors, isValid: isEmpty(errors) }
}

export default loginValidation
