import React from 'react'
import { View, Image, Text, TouchableOpacity } from "react-native";
import IMediaCard from '../../../../interfaces/components/IMediaCard'
import { styles } from './styled'

const MediaCard: React.FC<IMediaCard> = ({ name, description, images, onPlaylistId, id }) => {
  return (
    <TouchableOpacity style={styles.mediaInfoContainer} onPress={() => onPlaylistId(id)}>
      <Image source={{ uri: images[0]?.url }} style={styles.image} />
      <View>
        <Text style={styles.heading}>{name}</Text>
        <Text style={styles.subHeading}>{description?.substring(0,35) + '...'}</Text>
      </View>
    </TouchableOpacity >
  )
}

export default MediaCard
