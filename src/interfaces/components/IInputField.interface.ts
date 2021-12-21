export interface IInputField {
  error?: boolean
  errorMessage?: string
  errorMessageStyle?: object
  placeholderTextColor?: string
  placeholder?: string
  style?: object
  value?: string
  onChangeText?: (text: string) => void
  secureTextEntry?: boolean
}
