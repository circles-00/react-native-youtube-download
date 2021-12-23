import React, { useState } from 'react'
import { View, Text, TextInput, TouchableHighlight } from 'react-native'
import { styles } from './styled'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../services/actions/auth/authActions'
import InputField from '../../components/InputField'
import { IRootReducerState } from '../../interfaces/state/IRootReducerState.interface'
import { IErrorsState } from '../../interfaces/state/IErrorsState.interface'
import loginValidation from '../../services/validation/loginValidation'

const Login: React.FC = () => {
  const dispatch = useDispatch()

  const errors = useSelector<IRootReducerState, IErrorsState | undefined>(
    state => state.feedback.errors
  )

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [validationErrors, setValidationErrors] = useState<
    IErrorsState | undefined
  >(undefined)

  const onSignIn = () => {
    const { errors, isValid } = loginValidation({ email, password })
    if (!isValid) {
      setValidationErrors(errors)
    } else {
      setValidationErrors({})
      dispatch(login({ email, password }))
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.signIn}>Sign in</Text>
      <View style={styles.inputFields}>
        <InputField
          placeholderTextColor={'#2e2f33'}
          placeholder={'Email Address'}
          style={styles.input}
          value={email}
          onChangeText={text => setEmail(text)}
          error={true}
          errorMessage={validationErrors?.email || errors?.email}
          errorMessageStyle={styles.inputError}
        />
        <InputField
          placeholderTextColor={'#2e2f33'}
          placeholder={'Password'}
          style={[styles.input, styles.passwordInput]}
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry={true}
          error={true}
          errorMessageStyle={styles.inputError}
          errorMessage={validationErrors?.password || errors?.password}
        />
        <TouchableHighlight onPress={onSignIn}>
          <View style={styles.signInButton}>
            <Text style={styles.signInButtonText}>SIGN IN</Text>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  )
}

export default Login
