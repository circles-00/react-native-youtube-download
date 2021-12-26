import React from 'react'
import { FlatList, Text, View, ListRenderItem } from 'react-native'
import { styles } from './styled'
import IMediaCards from '../../../../interfaces/components/IMediaCards'
import MediaCard from './MediaCard'
import IMediaCard from '../../../../interfaces/components/IMediaCard'
import { useDispatch } from "react-redux";

const MediaCards: React.FC<IMediaCards> = ({ sectionTitle, items }) => {
  const dispatch = useDispatch()

  const onPlaylistId = (playlistId: string) => {
    // call getPlaylistsForCategory endpoint
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
