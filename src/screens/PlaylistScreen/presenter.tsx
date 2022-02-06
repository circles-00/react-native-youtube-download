import React, { useEffect } from "react";
import { FlatList, View, ListRenderItem } from 'react-native'
import { styles } from './styled'
import { IPlaylist } from '../../interfaces/components/IPlaylist.interface'
import { useDispatch, useSelector } from 'react-redux'
import { getSpotifyTracksForPlaylist } from '../../services/actions/spotify/spotifyActions'
import { IRootReducerState } from '../../interfaces/state/IRootReducerState.interface'
import { ISpotifyPlaylistTracks } from '../../interfaces/state/ISpotifyState.interface'
import MediaCardList from '../../components/MediaCardList'
import Header from "../../components/Header";
import { MUSIC_PLAYER_SCREEN_KEY } from "../MusicPlayer";
import {
  setArtistName,
  setImage,
  setIsInitPlay, setIsPlay,
  setSongName
} from "../../services/actions/musicPlayer/musicPlayerActions";

const PlaylistScreen: React.FC<IPlaylist> = ({ route, navigation }) => {
  const dispatch = useDispatch()
  const playlistTracks = useSelector<
    IRootReducerState,
    ISpotifyPlaylistTracks | undefined
  >(state => state.spotify.currentPlaylistTracks)
  const { playlistId, playlistName } = route.params

  useEffect(() => {
    dispatch(getSpotifyTracksForPlaylist(playlistId))
  }, [dispatch])

  const renderItem: ListRenderItem<any> = ({ item }) => {
    const artists = item.artists.map((artist: any) => artist.name)
    return (
      <MediaCardList
        name={item?.name}
        image={item.album.images[0].url}
        artists={artists.join(', ')}
        onMediaCardClick={onMediaCardClick}
      />
    )
  }

  const handleBackButton = () => {
    navigation.pop()
  }

  const onMediaCardClick = (name: string, image: string, artists: string) => {
    dispatch(setIsInitPlay(true))
    dispatch(setSongName(name))
    dispatch(setArtistName(artists))
    dispatch(setImage(image))
    navigation.push(MUSIC_PLAYER_SCREEN_KEY)
  }

  return (
    <View style={styles.container}>
      <Header playlistName={playlistName} handleBackButton={handleBackButton} />
      <FlatList
        style={styles.list}
        // @ts-ignore
        data={playlistTracks}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  )
}

export default PlaylistScreen
