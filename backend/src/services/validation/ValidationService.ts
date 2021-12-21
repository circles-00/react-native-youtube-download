import { ILoginErrors } from '../../interfaces/errors/ILoginErrors'
import { ILoginCredentials } from '../../interfaces/models/ILoginCredentials.interface'
import { ILoginValidationResponse } from '../../interfaces/validation/ILoginValidationResponse.interface'
import isEmpty from 'lodash.isempty'
import { IRegisterBody } from '../../interfaces/models/IRegisterBody.interface'
import { IRegisterErrors } from '../../interfaces/errors/IRegisterErrors'

class ValidationService {
  login(credentials: ILoginCredentials): ILoginValidationResponse {
    const errors: ILoginErrors = {}
    const { email, password } = credentials

    if (isEmpty(email)) {
      errors.email = 'Email cannot be empty'
    }

    if (isEmpty(password)) {
      errors.password = 'Password cannot be empty'
    }

    return { errors, isValid: isEmpty(errors) }
  }

  register(credentials: IRegisterBody): ILoginValidationResponse {
    const errors: IRegisterErrors = {}
    const { first_name, last_name, email, password, confirm_password } =
      credentials

    if (isEmpty(email)) {
      errors.email = 'Email cannot be empty'
    }
    if (isEmpty(password)) {
      errors.password = 'Password cannot be empty'
    }

    if (isEmpty(confirm_password)) {
      errors.confirm_password = 'You must confirm your password'
    }

    if (password !== confirm_password) {
      errors.confirm_password
    }

    if (isEmpty(first_name)) {
      errors.first_name = 'You must provide your first name'
    }

    if (isEmpty(last_name)) {
      errors.last_name = 'You must provide your last name'
    }

    return { errors, isValid: isEmpty(errors) }
  }
}

export default ValidationService
