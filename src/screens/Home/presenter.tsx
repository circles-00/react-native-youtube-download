import React from 'react'
import { View, Text, ScrollView, SafeAreaView } from 'react-native'

import { styles } from './styled'
import GreetingsHeading from './components/GreetingsHeading/GreetingsHeading'
import { Searchbar } from 'react-native-paper'
import { Colors } from '../../constants/Colors'
import MediaCards from './components/MediaCards/MediaCards'
import { MediaMock } from '../../constants/MediaMock'

const Home: React.FC = () => {
  return (
    <SafeAreaView style={styles.mediaMapContainer}>
      <ScrollView>
        <GreetingsHeading title={'Hi There,'} name={'Nikola'} />
        {
          // @ts-ignore
          <Searchbar
            theme={{
              colors: {
                placeholder: styles.searchInput.color,
                text: Colors.primary
              }
            }}
            inputStyle={styles.searchInput}
            style={styles.searchBar}
            placeholder={'Songs, albums or artists'}
          />
        }
        <MediaCards sectionTitle={'Trending Now'} items={MediaMock} />
        <MediaCards sectionTitle={'Popular Now'} items={MediaMock} />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home
