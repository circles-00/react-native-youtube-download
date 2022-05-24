import { StyleSheet } from 'react-native'
import { Colors } from "../../config/Colors";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    height: '100%',
    width: '100%'
  },
  albumArt: {
    width: 300,
    height: 300,
    borderRadius: 15,
    marginTop: 25,
    marginLeft: 45
  },
  songInfo: {
  },
  songName: {
    fontSize: 35,
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 35
  },
  artists: {
    fontSize: 15,
    color: '#beb6b6',
    textAlign: 'center'
  },
  audioControls: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 45,
  },
  previousSong: {
    marginTop: 10,
    marginRight: 20
  },
  nextSong: {
    marginTop: 10,
    marginLeft: 20
  },
  progressBarSection: {
    marginTop: 35,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
})
