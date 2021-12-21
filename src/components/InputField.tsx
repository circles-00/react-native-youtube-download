import React from 'react'
import { IInputField } from '../interfaces/components/IInputField.interface'
import { TextInput, Text } from 'react-native'

const InputField: React.FC<IInputField> = ({
  error,
  errorMessageStyle,
  errorMessage,
  placeholderTextColor,
  placeholder,
  style,
  value,
  onChangeText,
  secureTextEntry
}) => {
  return (
    <React.Fragment>
      <TextInput
        placeholderTextColor={placeholderTextColor}
        placeholder={placeholder}
        style={style}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
      {error ? <Text style={errorMessageStyle}>{errorMessage}</Text> : null}
    </React.Fragment>
  )
}

export default InputField
