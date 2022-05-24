import React, { useEffect } from "react";
import { FlatList, ListRenderItem, View } from "react-native";
import { styles } from "./styled";
import { IPlaylist } from "../../interfaces/components/IPlaylist.interface";
import { useDispatch, useSelector } from "react-redux";
import {
  getSpotifyTracksForPlaylist,
  setSpotifyTracksForPlaylist
} from "../../services/actions/spotify/spotifyActions";
import { IRootReducerState } from "../../interfaces/state/IRootReducerState.interface";
import MediaCardList from "../../components/MediaCardList";
import Header from "../../components/Header";
import { MUSIC_PLAYER_SCREEN_KEY } from "../MusicPlayer";
import { setCurrentPlaylistTracks, setCurrentSong } from "../../services/actions/musicPlayer/musicPlayerActions";
import { Track } from "react-native-track-player";


const PlaylistScreen: React.FC<IPlaylist> = ({ route, navigation }) => {
  const dispatch = useDispatch()
  const { playlistId, playlistName } = route.params

  const { spotify: {currentPlaylistTracks} } = useSelector((state: IRootReducerState) => state)

  useEffect(() => {
    dispatch(getSpotifyTracksForPlaylist(playlistId))

    return () => {
      dispatch(setSpotifyTracksForPlaylist([]))
    }
  }, [dispatch])

  const renderItem: ListRenderItem<Track> = ({ item, index }) => {
    // const artists = item.artists.map((artist: any) => artist.name)
    return (
      <MediaCardList
        name={item?.title}
        image={item?.artwork}
        artists={item?.artist}
        onMediaCardClick={() => onMediaCardClick(item)}
      />
    )
  }

  const handleBackButton = () => {
    navigation.pop()
  }

  const onMediaCardClick = (track: Track) => {
    dispatch(setCurrentSong(track))
    dispatch(setCurrentPlaylistTracks(currentPlaylistTracks))
  }

  return (
    <View style={styles.container}>
      <Header playlistName={playlistName} handleBackButton={handleBackButton} />
      <FlatList
        style={styles.list}
        // @ts-ignore
        data={currentPlaylistTracks}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  )
}

export default PlaylistScreen
