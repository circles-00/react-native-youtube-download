import React, { useEffect } from 'react'
import { ScrollView, SafeAreaView } from 'react-native'

import { styles } from './styled'
import GreetingsHeading from './components/GreetingsHeading/GreetingsHeading'
import { Searchbar } from 'react-native-paper'
import { Colors } from '../../config/Colors'
import MediaCards from './components/MediaCards/MediaCards'
import { getSpotifyCategories } from '../../services/actions/spotify/spotifyActions'
import { useDispatch, useSelector } from 'react-redux'
import { IRootReducerState } from '../../interfaces/state/IRootReducerState.interface'
import MiniMusicPlayer from './components/MiniMusicPlayer/MiniMusicPlayer'

const Home: React.FC = (props: any) => {
  const dispatch = useDispatch()

  const {
    spotify: { categories },
    musicPlayer: { currentSong }
  } = useSelector((state: IRootReducerState) => state)

  useEffect(() => {
    dispatch(getSpotifyCategories())
  }, [dispatch])

  return (
    <SafeAreaView style={styles.mediaMapContainer}>
      {Object.values(currentSong).length > 0 ? (
        <MiniMusicPlayer navigation={props.navigation} />
      ) : null}

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

        {categories?.map((category: any, idx) => {
          return category?.playlists?.length > 0 ? (
            <MediaCards
              key={idx}
              sectionTitle={category.title as string}
              items={category.playlists}
              navigation={props.navigation}
            />
          ) : null
        })}
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home
