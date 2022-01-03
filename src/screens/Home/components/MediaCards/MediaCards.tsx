import React from 'react'
import { FlatList, Text, View, ListRenderItem } from 'react-native'
import { styles } from './styled'
import IMediaCards from '../../../../interfaces/components/IMediaCards'
import MediaCard from './MediaCard'
import IMediaCard from '../../../../interfaces/components/IMediaCard'
import { useDispatch } from "react-redux";
import { PLAYLIST_SCREEN_KEY } from "../../../PlaylistScreen";

const MediaCards: React.FC<IMediaCards> = ({ sectionTitle, items, navigation }) => {
  const dispatch = useDispatch()

  const onPlaylistId = (playlistId: string) => {
    console.log(`PLAYLIST SCREEN PUSHED, playlistId: ${playlistId}`)
    navigation.push(PLAYLIST_SCREEN_KEY)
  }

  const renderItem: ListRenderItem<IMediaCard> = ({ item }) => {
    return (
      <MediaCard
        name={item.name}
        description={item.description}
        images={item.images}
        onPlaylistId={onPlaylistId}
        id={item.id}
      />
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{sectionTitle}</Text>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal={true}
      />
    </View>
  )
}

export default MediaCards
