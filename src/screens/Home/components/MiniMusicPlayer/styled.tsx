import { StyleSheet } from 'react-native'
import { Colors } from '../../../../config/Colors'

export const styles = StyleSheet.create({
  container: {
    width: '93.5%',
    height: 65,
    backgroundColor: Colors.primary,
    position: 'absolute',
    top: '91%',
    zIndex: 999,
    marginLeft: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 10
  },
  songInfo: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 12.5,
    marginLeft: -95
  },
  artistInfo: {
    color: 'gray'
  },
  audioControl: {
    marginTop: 12,
    marginRight: 15
  }
})
