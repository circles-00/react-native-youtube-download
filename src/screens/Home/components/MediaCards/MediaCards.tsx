import React from 'react'
import { FlatList, Text, View, ListRenderItem } from 'react-native'
import { styles } from './styled'
import IMediaCards from '../../../../interfaces/components/IMediaCards'
import MediaCard from './MediaCard'
import IMediaCard from '../../../../interfaces/components/IMediaCard'
import { PLAYLIST_SCREEN_KEY } from '../../../PlaylistScreen'

const MediaCards: React.FC<IMediaCards> = ({
  sectionTitle,
  items,
  navigation
}) => {
  const onPlaylistId = (playlistId: string, playlistName: string) => {
    console.log(`PLAYLIST SCREEN PUSHED, playlistId: ${playlistId}`)
    navigation.push(PLAYLIST_SCREEN_KEY, {
      playlistId: playlistId,
      playlistName: playlistName
    })
  }

  const renderItem: ListRenderItem<IMediaCard> = ({ item }) => {
    return (
      <MediaCard
        title={item?.title}
        description={item.description}
        thumbnail={item.thumbnail}
        onPlaylistId={onPlaylistId}
        id={item.spotifyId}
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
