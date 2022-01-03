import React, { useEffect } from "react";
import { ScrollView, SafeAreaView } from 'react-native'

import { styles } from './styled'
import GreetingsHeading from './components/GreetingsHeading/GreetingsHeading'
import { Searchbar } from 'react-native-paper'
import { Colors } from '../../config/Colors'
import MediaCards from './components/MediaCards/MediaCards'
import { getSpotifyCategories } from "../../services/actions/spotify/spotifyActions";
import { useDispatch, useSelector } from "react-redux";
import {IRootReducerState} from "../../interfaces/state/IRootReducerState.interface";
import { ISpotifyCategories } from "../../interfaces/state/ISpotifyState.interface";

const Home: React.FC = (props) => {
  const dispatch = useDispatch()

  const categories = useSelector<IRootReducerState, ISpotifyCategories | undefined>(state => state.spotify.categories)

  useEffect(() => {
    dispatch(getSpotifyCategories())
  }, [dispatch])

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

        {categories?.items?.map((category: object, idx) => {
          // @ts-ignore
          return <MediaCards key={idx} sectionTitle={category.name as string} items={category.playlists} navigation={props.navigation} />
        })}
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home
