import React from 'react'
import { FlatList, Text, View, ListRenderItem } from 'react-native'
import { styles } from './styled'
import IMediaCards from '../../../../interfaces/components/IMediaCards'
import MediaCard from './MediaCard'
import IMediaCard from '../../../../interfaces/components/IMediaCard'

const MediaCards: React.FC<IMediaCards> = ({ sectionTitle, items }) => {
  const renderItem: ListRenderItem<IMediaCard> = ({ item }) => {
    return (
      <MediaCard
        heading={item.heading}
        subHeading={item.subHeading}
        imageUrl={item.imageUrl}
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
