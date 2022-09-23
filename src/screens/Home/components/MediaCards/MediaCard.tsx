import React from 'react'
import { View, Image, Text, TouchableOpacity } from 'react-native'
import IMediaCard from '../../../../interfaces/components/IMediaCard'
import { styles } from './styled'

const MediaCard: React.FC<IMediaCard> = ({
  title,
  description,
  thumbnail,
  onPlaylistId,
  id
}) => {
  console.log('title', title)
  return (
    <TouchableOpacity
      style={styles.mediaInfoContainer}
      onPress={() => onPlaylistId(id, title)}
    >
      <Image source={{ uri: thumbnail }} style={styles.image} />
      <View>
        <Text style={styles.heading}>{title}</Text>
        <Text style={styles.subHeading}>
          {description?.substring(0, 35) + '...'}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default MediaCard
