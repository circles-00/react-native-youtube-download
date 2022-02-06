import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  loadingSpinner_container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(46, 47, 51, 1)',
    textAlign: 'center'
  },
  mediaCardListContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 20,
    marginLeft: 15
  },
  mediaCardListImage: {
    width: 64,
    height: 64,
    borderRadius: 15
  },
  mediaCardListInfo: {
    flexDirection: 'column',
    marginTop: 10,
    marginLeft: 15,
    width: 200
  },
  mediaCardListHeadingText: {
    color: '#ffffff'
  },
  mediaCardListSubHeadingText: {
    color: '#C2B5B5FF'
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 45,
    marginLeft: 15
  },
  headerText: {
    color: '#ffffff',
    marginTop: 5,
    marginLeft: 85
  }
})
