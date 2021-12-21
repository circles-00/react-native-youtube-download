// @ts-ignore
import styled from '@emotion/native'
import { StyleSheet } from 'react-native'
import { Colors } from '../../../../config/Colors'

export const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    marginLeft: 10
  },
  sectionTitle: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10
  },
  mediaInfoContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginRight: 15
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 15
  },
  heading: {
    color: '#fff',
    textAlign: 'center'
  },
  subHeading: {
    color: '#cbbfbf',
    textAlign: 'center'
  }
})
