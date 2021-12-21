import { StyleSheet } from 'react-native'
import { Colors } from '../../config/Colors'

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2e2f33',
    height: '100%'
  },
  signIn: {
    color: '#ffffff',
    marginTop: 275,
    fontSize: 24,
    textAlign: 'center'
  },
  inputFields: {
    marginTop: 30,
    marginLeft: 60,
    width: '70%'
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 50,
    backgroundColor: '#ffffff',
    height: 60,
    borderColor: '#2e2f33',
    fontWeight: 'bold'
  },
  inputError: {
    color: 'red',
    textAlign: 'center'
  },
  passwordInput: {
    marginTop: 15
  },
  signInButton: {
    backgroundColor: '#2ebd59',
    height: 60,
    borderRadius: 50,
    marginTop: 15
  },
  signInButtonText: {
    marginTop: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24,
    color: '#ffffff'
  }
})
