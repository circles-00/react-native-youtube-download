import React, { useEffect } from "react";
import { FlatList, View, Text, ListRenderItem } from "react-native";
import { styles } from "./styled";
import { IPlaylist } from "../../interfaces/components/IPlaylist.interface";
import { useDispatch, useSelector } from "react-redux";
import { getSpotifyTracksForPlaylist } from "../../services/actions/spotify/spotifyActions";
import { IRootReducerState } from "../../interfaces/state/IRootReducerState.interface";
import { ISpotifyPlaylistTracks } from "../../interfaces/state/ISpotifyState.interface";
import IMediaCard from "../../interfaces/components/IMediaCard";
import MediaCard from "../Home/components/MediaCards/MediaCard";

const PlaylistScreen: React.FC<IPlaylist> = ({route, navigation}) => {
  const dispatch = useDispatch()
  const playlistTracks = useSelector<IRootReducerState, ISpotifyPlaylistTracks | undefined>(state => state.spotify.currentPlaylistTracks)
  const { playlistId } = route.params

  useEffect(() => {
    dispatch(getSpotifyTracksForPlaylist(playlistId))
  }, [dispatch])

  const renderItem: ListRenderItem = ({ item }) => {
    return <Text>{item.name}</Text>
  }

  return(
    <View style={styles.container}>
      <FlatList
        data={playlistTracks}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  )
}

export default PlaylistScreen